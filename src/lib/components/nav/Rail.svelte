<script lang="ts">
	import { Nav } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import IconMenu from 'lucide-svelte/icons/menu';
	import IconFolder from 'lucide-svelte/icons/folder';
	import IconGrid3X3 from 'lucide-svelte/icons/grid-3x3';
	import IconFileSliders from 'lucide-svelte/icons/file-sliders';
	import IconGem from 'lucide-svelte/icons/gem';
	import IconSettings from 'lucide-svelte/icons/settings';

	let hrefExample = '#';

	let expanded = false;
</script>

<Nav.Rail>
	{#snippet header()}
		<Nav.Tile id="menu" href="/" title="Menu" onclick={() => (expanded = !expanded)}
			><IconMenu /></Nav.Tile
		>
	{/snippet}
	{#snippet tiles()}
		<Nav.Tile id="0" label="Overview" href={hrefExample}>
			<IconFolder />
		</Nav.Tile>
		<Nav.Tile id="1" label="Layout" href={hrefExample}>
			<IconGrid3X3 />
		</Nav.Tile>
		<Nav.Tile id="2" label="Config" href={hrefExample}>
			<IconFileSliders />
		</Nav.Tile>
		<Nav.Tile id="3" label="Presets" href={hrefExample}>
			<IconGem />
		</Nav.Tile>
	{/snippet}
	{#snippet footer()}
		<Nav.Tile labelExpanded="Settings" href="/settings" title="settings"><IconSettings /></Nav.Tile>
	{/snippet}
</Nav.Rail>
