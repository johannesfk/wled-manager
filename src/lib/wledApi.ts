export class WLEDApi {
	constructor(private baseUrl: string) {}

	async getInfo() {
		const response = await fetch(`${this.baseUrl}/json/info`);
		return response.json();
	}

	async setDMXMode(mode: number) {
		const response = await fetch(`${this.baseUrl}/json/state`, {
			method: 'POST',
			body: JSON.stringify({ dmx: { mode } }),
			headers: { 'Content-Type': 'application/json' }
		});
		return response.json();
	}

	async setDMXAddress(address: number) {
		const response = await fetch(`${this.baseUrl}/json/state`, {
			method: 'POST',
			body: JSON.stringify({ dmx: { address } }),
			headers: { 'Content-Type': 'application/json' }
		});
		return response.json();
	}

	async reboot() {
		const response = await fetch(`${this.baseUrl}/json/state`, {
			method: 'POST',
			body: JSON.stringify({ rb: true }),
			headers: { 'Content-Type': 'application/json' }
		});
		return response.json();
	}
}
