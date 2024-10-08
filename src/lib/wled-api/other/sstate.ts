import { WledJsonApiError } from './errors';

export class State {
	// Define properties of the State class
	// Example:
	// public property1: string;
	// public property2: number;

	constructor(/* properties */) {
		// Initialize properties
		// Example:
		// this.property1 = property1;
		// this.property2 = property2;
	}

	// Method to convert State instance to JSON string
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	// Static method to create a State instance from a JSON string
	static fromJson(jsonString: string): State {
		try {
			const jsonObject = JSON.parse(jsonString);
			// Create a new State instance from the parsed JSON object
			// Example:
			// return new State(jsonObject.property1, jsonObject.property2);
			return new State(/* properties from jsonObject */);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}
