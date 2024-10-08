import { WledJsonApiError } from './WledJsonApiError';

/**
 * Wifi class representing the structure of the Wifi object.
 */
export class Wifi {
	bssid?: string;
	rssi?: number;
	signal?: number;
	channel?: number;

	constructor(data: Partial<Wifi> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Wifi instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Wifi instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Wifi {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Wifi(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Wifi instance to a JSON string.
	 * @returns The JSON string representation of the Wifi instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}
