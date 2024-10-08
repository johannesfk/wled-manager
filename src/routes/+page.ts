import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/mdns');
	const services = await res.json();
	return services;
}) satisfies PageLoad;
