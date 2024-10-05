import { WledJsonApiError } from './WledJsonApiError';

/**
 * MatrixDims class representing the structure of the MatrixDims object.
 */
export class MatrixDims {
	w?: number;
	h?: number;

	constructor(data: Partial<MatrixDims> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a MatrixDims instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The MatrixDims instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): MatrixDims {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new MatrixDims(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the MatrixDims instance to a JSON string.
	 * @returns The JSON string representation of the MatrixDims instance.
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
