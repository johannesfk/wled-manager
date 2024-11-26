<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Info, State } from '$lib/types/wled';
	import { SvelteMap } from 'svelte/reactivity';
	import Liveview from '$lib/components/Liveview.svelte';
	let { data }: PageData = $props();

	let isRebooting = $state(false);
	let isReconnecting = $state(false);

	const tableData = data.services;

	let webSockets: WebSocket[] = [];

	interface ConnectionState {
		connected: boolean;
		retries: number;
		error: null | Error;
		info?: Info;
		state?: State;
	}

	let connectionStates: SvelteMap<string, ConnectionState> = $state(new SvelteMap());
	const CONNECTION_TIMEOUT = 5000;
	const MAX_RETRIES = 3;

	let pingInterval: string | number | NodeJS.Timeout | undefined;

	$effect(() => {
		console.log('connectionStates changed:', connectionStates);
	});

	function connectWebSockets() {
		tableData.forEach((row) => {
			connectSingle(row);
		});
	}

	function connectSingle(row, retryCount = 0) {
		if (isRebooting || isReconnecting) {
			console.log(`Skipping connection for ${row.host} - reboot/reconnect in progress`);
			return;
		}
		// Set initial connection state
		connectionStates.set(row.host, {
			connected: false,
			retries: retryCount,
			error: null
		});

		// Connection timeout handler
		const timeoutId = setTimeout(() => {
			if (!connectionStates.get(row.host)?.connected) {
				handleConnectionError(row, new Error('Connection timeout'));
			}
		}, CONNECTION_TIMEOUT);

		try {
			const ws = new WebSocket(`ws://${row.host}:${row.port}/ws`);

			ws.onopen = () => {
				clearTimeout(timeoutId);
				connectionStates.set(row.host, {
					connected: true,
					retries: retryCount,
					error: null
				});
				console.log(`Connected to WebSocket for ${row.host}`);

				// Send ping every 5 seconds
				pingInterval = setInterval(() => {
					ws.send(JSON.stringify({ v: true }));
				}, 2000);
			};

			ws.onmessage = (event) => {
				try {
					const data: { info: Info; state: State } = JSON.parse(event.data);
					// console.log(`Message from ${row.host}:`, data);
					// Get current connection state
					const currentState = connectionStates.get(row.host) || {
						connected: false,
						retries: 0,
						error: null
					};

					// Update map with new state including info and state data
					connectionStates.set(row.host, {
						...currentState,
						connected: true,
						info: data.info,
						state: data.state
					});
				} catch (error) {
					console.error(`Failed to process message from ${row.host}:`, error);
				}
			};

			ws.onclose = (event) => {
				clearTimeout(timeoutId);
				clearInterval(pingInterval);
				console.log(`WebSocket closed for ${row.host}`);

				if (!event.wasClean) {
					handleConnectionError(row, new Error('Connection closed unexpectedly'));
				}

				connectionStates.set(row.host, {
					connected: false,
					retries: retryCount,
					error: null
				});
			};

			ws.onerror = (error) => {
				clearTimeout(timeoutId);
				clearInterval(pingInterval);
				handleConnectionError(row, error);
			};

			webSockets.push(ws);
		} catch (error) {
			clearTimeout(timeoutId);
			clearInterval(pingInterval);
			handleConnectionError(row, error);
		}
	}
	const WS_STATES = {
		CONNECTING: 0,
		OPEN: 1,
		CLOSING: 2,
		CLOSED: 3
	};

	function closeWebSocket(host: string) {
		const state = connectionStates.get(host);
		if (state?.socket) {
			// Remove event listeners first
			state.socket.onclose = null;
			state.socket.onerror = null;
			state.socket.onmessage = null;

			if (
				state.socket.readyState === WS_STATES.OPEN ||
				state.socket.readyState === WS_STATES.CONNECTING
			) {
				state.socket.close(1000, 'Closing for reboot');
			}
			connectionStates.set(host, { ...state, socket: null });
		}
	}

	function handleConnectionError(row, error) {
		const state = connectionStates.get(row.host);

		console.error(`WebSocket error for ${row.host}:`, error);

		connectionStates.set(row.host, {
			connected: false,
			retries: state ? state.retries : 0,
			error: error.message
		});

		// Attempt reconnection if under max retries
		if (state && state.retries < MAX_RETRIES) {
			const nextRetry = state.retries + 1;
			console.log(`Attempting reconnection ${nextRetry}/${MAX_RETRIES} for ${row.host}`);

			setTimeout(() => {
				connectSingle(row, nextRetry);
			}, 1000 * nextRetry); // Exponential backoff
		}
	}

	function formatMacAddress(mac) {
		return mac.match(/.{1,2}/g).join(':');
	}

	function scan() {
		console.log('scan', tableData);
		invalidate('/api/mdns');
	}

	async function rebootAll() {
		console.log('rebootAll');
		isRebooting = true;
		isReconnecting = true;

		try {
			// Close all WebSockets first
			for (const row of tableData) {
				closeWebSocket(row.host);
			}

			// Wait for all sockets to close
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Reboot devices sequentially
			for (const row of tableData) {
				try {
					await fetch('/api/wled/reboot', {
						method: 'POST',
						body: JSON.stringify({
							host: connectionStates.get(row.host)?.info?.ip
						})
					});
					await new Promise((resolve) => setTimeout(resolve, 3000));
				} catch (error) {
					console.error(`Failed to reboot ${row.host}:`, error);
				}
			}

			// Wait for devices to come back online
			await new Promise((resolve) => setTimeout(resolve, 10000));
		} finally {
			isRebooting = false;
			isReconnecting = false;
			// Re-establish connections
			connectWebSockets();
		}
	}

	onMount(() => {
		connectWebSockets();
	});

	let showLiveview = $state(false);
</script>

<h1 class="h1">Scan for wled devices</h1>
<p>
	The following devices was found on the network.
	<br />
	<button type="button" class="btn m-4 preset-tonal-primary" onclick={() => scan()}
		>Scan again</button
	>
	<button type="button" class="btn m-4 preset-tonal-error" onclick={() => rebootAll()}
		>Reboot All</button
	>
</p>
<div class="table-wrap">
	<table class="table caption-bottom">
		<caption class="pt-4">A list of wled devices on the network</caption>
		<thead>
			<tr>
				<th>Hostname</th>
				<th>Host</th>
				<th>Port</th>
				<th>Addresses</th>
				<th>MAC</th>
				<th>Version</th>
				<th>FPS</th>
				<th>Live</th>
				<th>Data Source IP</th>
				<th>Data Source Portocol</th>
				<th>
					<span>Liveview</span>
					<button
						type="button"
						class="btn preset-tonal"
						onclick={() => (showLiveview = !showLiveview)}>{showLiveview ? 'Hide' : 'Show'}</button
					>
				</th>
			</tr>
		</thead>
		<tbody class="hover:[&>tr]:preset-tonal-primary">
			{#each tableData as row}
				<tr>
					<td>{row.name}</td>
					<td>
						<a href="http://{row.host}" target="_blank">{row.host}</a>
					</td>
					<td>{row.port}</td>
					<td>
						{#each row.addresses as address}
							<a href="http://{address}" target="_blank">{address}</a>
						{/each}
					</td>
					<td>{formatMacAddress(row?.txt?.mac)}</td>
					<td>{connectionStates.get(row.host)?.info?.ver ?? 'N/A'}</td>
					<td>{connectionStates.get(row.host)?.info?.leds?.fps ?? 'N/A'}</td>
					<td
						class={connectionStates.get(row.host)?.info?.live
							? 'text-success-400-600'
							: 'text-warning-400-600'}
						>{connectionStates.get(row.host)?.info?.live ? 'Live' : 'Static'}</td
					>
					<td>{connectionStates.get(row.host)?.info?.lip ?? 'N/A'}</td>
					<td>{connectionStates.get(row.host)?.info?.lm ?? 'N/A'}</td>
					<td class="w-52">
						{#if connectionStates.get(row.host)?.connected}
							{#if showLiveview}
								<Liveview baseUrl={`http://${row.host}:${row.port}`} />
							{:else}
								<span class="text-neutral-300">Paused</span>
							{/if}
						{:else}
							<span class="text-red-500">Disconnected</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="10"></td>
				<td class="text-right"
					>{tableData.length} {tableData.length > 1 ? 'hosts' : 'host'} found</td
				>
			</tr>
		</tfoot>
	</table>
</div>
