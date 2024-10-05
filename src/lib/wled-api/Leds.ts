import { WledJsonApiError } from './WledJsonApiError';
import { MatrixDims } from './MatrixDims';

/**
 * Leds class representing the structure of the Leds object.
 */
export class Leds {
	count?: number;
	pwr?: number;
	fps?: number;
	maxpwr?: number;
	maxseg?: number;
	matrix?: MatrixDims;
	seglc?: number[];
	lc?: number;
	rgbw?: boolean;
	wv?: number;
	cct?: number;
	pin?: number[];
	i2c?: [number, number];
	spi?: [number, number, number];

	constructor(data: Partial<Leds> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Leds instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Leds instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Leds {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Leds(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Leds instance to a JSON string.
	 * @returns The JSON string representation of the Leds instance.
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
