import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { WLEDApi } from '$lib/wledApi';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { host, port = 80 } = await request.json();

		if (!host) {
			return json({ error: 'Host is required' }, { status: 400 });
		}

		const api = new WLEDApi(`http://${host}:${port}`);
		await api.reboot();

		return json({ success: true });
	} catch (error) {
		console.error(error);
		return json({ error: error.message }, { status: 500 });
	}
};
