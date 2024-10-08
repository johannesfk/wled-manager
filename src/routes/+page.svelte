<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	// console.log(data);

	const tableData = data.services;

	function formatMacAddress(mac) {
		return mac.match(/.{1,2}/g).join(':');
	}
</script>

<h1 class="h1">Scan for wled devices</h1>
<p>
	The following devices was found on the network.
	<br />
	<a
		type="button"
		href="#scan"
		class="btn m-4 preset-tonal-primary"
		on:click={() => console.log('scan clicked')}>Scan again</a
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
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="4">Total</td>
				<td class="text-right"
					>{tableData.length} {tableData.length > 1 ? 'hosts' : 'host'} online</td
				>
			</tr>
		</tfoot>
	</table>
</div>
