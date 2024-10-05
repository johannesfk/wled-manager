export class WledJsonApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'WledJsonApiError';
	}

	static SerdeError(error: Error): WledJsonApiError {
		return new WledJsonApiError(`Serialization/Deserialization Error: ${error.message}`);
	}
}
