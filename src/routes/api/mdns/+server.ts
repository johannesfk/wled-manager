import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { Bonjour } from 'bonjour-service';
const service = new Bonjour();

const services: {
	name: string;
	host: string;
	port: number;
	addresses: string[];
	fqdn: string;
	referer: unknown;
	txt: unknown;
}[] = [];
const browser = service.find({ type: 'wled' });

browser.on('up', (service) => {
	// console.log('up', service);
	services.push(service);
});

browser.on('down', (service) => {
	console.log('down', service);
});

export const GET: RequestHandler = async () => {
	return new Promise((resolve) => {
		resolve(
			json({
				message: 200,
				services: services.map((service) => {
					return {
						name: service.name,
						host: service.host,
						port: service.port,
						addresses: service.addresses,
						fqdn: service.fqdn,
						referer: service.referer,
						txt: service.txt
					};
				})
			})
		);
	});
};
