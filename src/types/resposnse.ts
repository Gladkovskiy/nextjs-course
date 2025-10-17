/* export class ActionResponse<T = null> {
	readonly success: boolean
	readonly message: string
	readonly responseObject: T

	private constructor(success: boolean, message: string, responseObject: T) {
		this.success = success
		this.message = message
		this.responseObject = responseObject
	}

	static success<T>(message: string, responseObject: T) {
		return new ActionResponse(true, message, responseObject)
	}

	static failure(message: string) {
		return new ActionResponse(false, message, null)
	}
} */

export interface ActionResponse<T = null> {
	success: boolean
	message: string
	responseObject: T
}
