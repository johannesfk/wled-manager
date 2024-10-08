<script>
	import Rail from '$lib/components/nav/Rail.svelte';
	import '../app.css';
	import { onMount } from 'svelte';

	let time = new Date();
	function padWithZero(num) {
		return String(num).padStart(2, '0');
	}

	$: hours = padWithZero(time.getHours());
	$: minutes = padWithZero(time.getMinutes());
	$: seconds = padWithZero(time.getSeconds());

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="bg-surface-800 p-4">
		<!-- Show current time -->
		<p>{hours}:{minutes}:{seconds}</p>
	</header>
	<!-- Grid Columns -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<!-- Left Sidebar. -->
		<aside class="">
			<Rail />
		</aside>
		<!-- Main Content -->
		<main class="space-y-4 p-4">
			<slot></slot>
		</main>
	</div>
	<!-- Footer -->
	<footer class="bg-surface-800 p-4">(footer)</footer>
</div>
