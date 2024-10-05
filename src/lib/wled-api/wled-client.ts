import type { State, Cfg } from './State';

export class WledClient {
	private baseUrl: string;

	constructor(url: string) {
		this.baseUrl = url;
	}

	async getState(): Promise<State> {
		const response = await fetch(`${this.baseUrl}/json/state`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}

	async setState(state: Partial<State>): Promise<Response> {
		const response = await fetch(`${this.baseUrl}/json/state`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(state)
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response;
	}

	// Implement other methods like getCfg, setCfg, etc.
}

import { WledJsonApiError } from './WledJsonApiError';

try {
	// Create a new State instance
	const state = new State(/* properties */);

	// Convert State instance to JSON string
	const jsonString = state.toJson();
	console.log('JSON String:', jsonString);

	// Create a State instance from a JSON string
	const newState = State.fromJson(jsonString);
	console.log('New State:', newState);
} catch (error) {
	if (error instanceof WledJsonApiError) {
		console.error('WledJsonApiError:', error.message);
	} else {
		console.error('Unexpected Error:', error);
	}
}
