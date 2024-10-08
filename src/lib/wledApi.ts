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