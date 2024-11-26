export class WLEDApi {
	constructor(private baseUrl: string) {}
	private readonly timeout = 5000; // 5 second timeout
	private readonly retries = 2;

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
		try {
			console.log('Rebooting...', this.baseUrl);

			// Ensure URL has protocol
			const url = this.baseUrl.startsWith('http')
				? `${this.baseUrl}/json/state`
				: `http://${this.baseUrl}/json/state`;

			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({ rb: true }),
				headers: { 'Content-Type': 'application/json' },
				// Add reasonable timeout
				signal: AbortSignal.timeout(5000)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return response.json();
		} catch (error) {
			console.error('Reboot failed:', error);
			throw new Error(`Failed to reboot WLED device: ${error.message}`);
		}
	}
}

function calculateSyncGroupValues() {
	var syncGroupSendValue = 0; // Initialize the total value for sync group send
	var syncGroupReceiveValue = 0; // Initialize the total value for sync group receive
	var binaryWeight = 1; // Initialize the binary weight, starting at 1 (2^0)

	// Loop through each of the 8 sync groups
	for (var groupIndex = 0; groupIndex < 8; groupIndex++) {
		// Get the checked status of the sync group send checkbox
		var isSyncGroupSendChecked = gId('G' + (groupIndex + 1)).checked;
		// Update the total value for sync group send based on the checkbox state
		syncGroupSendValue += isSyncGroupSendChecked * binaryWeight;

		// Get the checked status of the sync group receive checkbox
		var isSyncGroupReceiveChecked = gId('R' + (groupIndex + 1)).checked;
		// Update the total value for sync group receive based on the checkbox state
		syncGroupReceiveValue += isSyncGroupReceiveChecked * binaryWeight;

		// Update the binary weight for the next checkbox (double the current weight)
		binaryWeight *= 2;
	}

	// Set the calculated sync group send value in the corresponding input field
	gId('GS').value = syncGroupSendValue;
	// Set the calculated sync group receive value in the corresponding input field
	gId('GR').value = syncGroupReceiveValue;
}
