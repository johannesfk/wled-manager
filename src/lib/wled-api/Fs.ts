import { WledJsonApiError } from './WledJsonApiError';

/**
 * Fs class representing the structure of the Fs object.
 */
export class Fs {
	u?: number;
	t?: number;
	pmt?: number;

	constructor(data: Partial<Fs> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Fs instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Fs instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Fs {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Fs(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Fs instance to a JSON string.
	 * @returns The JSON string representation of the Fs instance.
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
