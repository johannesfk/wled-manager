<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let baseUrl: string;
	let ws: WebSocket;
	let tmout: 0 | ReturnType<typeof setTimeout>;
	let canv: HTMLDivElement;

	function update() {
		if (typeof document !== 'undefined' && document.hidden) {
			clearTimeout(tmout);
			tmout = setTimeout(update, 250);
			return;
		}
		fetch(`${baseUrl}/json/live`)
			.then((e) => {
				if (!e.ok) {
					console.error('Fetch error:', e.statusText);
					clearTimeout(tmout);
					tmout = setTimeout(update, 2500);
					return;
				}
				return e.json();
			})
			.then((e) => {
				// console.log('Fetch successful:', e);
				let t = 'linear-gradient(90deg,';
				const n = e.leds.length;
				for (let i = 0; i < n; i++) {
					let o = e.leds[i];
					if (o.length > 6) o = o.substring(2);
					t += '#' + o;
					if (i < n - 1) t += ',';
				}
				t += ')';
				canv.style.background = t;
				clearTimeout(tmout);
				tmout = setTimeout(update, 40);
			})
			.catch(() => {
				console.error('Fetch error:', error);
				clearTimeout(tmout);
				tmout = setTimeout(update, 2500);
			});
	}

	function setupWebSocket() {
		if (typeof window !== 'undefined') {
			try {
				ws = top.window.ws;
			} catch (e) {}
			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.send("{'lv':true}");
			} else {
				ws = new WebSocket(`${baseUrl.replace('http', 'ws')}/ws`);
				ws.onopen = function () {
					ws.send("{'lv':true}");
				};
			}
			ws.binaryType = 'arraybuffer';
			ws.addEventListener('message', handleWebSocketMessage);
		}
	}

	function handleWebSocketMessage(event: MessageEvent) {
		try {
			if ('[object ArrayBuffer]' === toString.call(event.data)) {
				let e = new Uint8Array(event.data);
				console.log('Peek WS data:', e);
				if (76 != e[0]) return;
				let t = 'linear-gradient(90deg,',
					n = e.length,
					o = 2 == e[1] ? 4 : 2;
				for (let i = o; i < n; i += 3)
					(t += `rgb(${e[i]},${e[i + 1]},${e[i + 2]})`), i < n - 3 && (t += ',');
				t += ')';
				canv.style.background = t;
			}
		} catch (e) {
			console.error('Peek WS error:', e);
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			console.log('Component mounted');
			setupWebSocket();
			document.addEventListener('visibilitychange', update);
		}
	});

	onDestroy(() => {
		clearTimeout(tmout);
		if (ws) {
			ws.removeEventListener('message', handleWebSocketMessage);
			ws.close();
		}
		if (typeof document !== 'undefined') {
			console.log('Component destroyed');
			document.removeEventListener('visibilitychange', update);
		}
	});
</script>

<div bind:this={canv} class="box-border h-2 w-full brightness-150"></div>
