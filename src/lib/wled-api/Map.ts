import { WledJsonApiError } from './WledJsonApiError';

/**
 * Map class representing the structure of the Map object.
 */
export class Map {
	id?: number;
	n?: string;

	constructor(data: Partial<Map> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Map instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Map instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Map {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Map(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Map instance to a JSON string.
	 * @returns The JSON string representation of the Map instance.
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
