class ResponseHandler {
    constructor(status, success, data) {
        this.status = status;
        this.success = success;
        this.data = data;
    }
    createResponseFormat = () => {
        return {
            status: this.status,
            payload: {
                success: this.success,
                [this.success ? 'data' : 'message']: this.data
            }
        }
    }
}

/*
Create a new responseHandler for create status - 201
Give it some name
use in on users/POST tweets/POST
*/



const validResponse = (data) => new ResponseHandler(200, true, data).createResponseFormat()
const createdResponse = (value) => new ResponseHandler(201, true, value).createResponseFormat()
const errSchema = (message) => new ResponseHandler(422, false, message).createResponseFormat()
const userConflictError = () => new ResponseHandler(409, false, 'Conflict - user already exists').createResponseFormat()
const errorNotAuthed = () => new ResponseHandler(401, false, 'You are not authorized to access this resource').createResponseFormat()
module.exports = {
    validResponse,
    errSchema,
    createdResponse,
    userConflictError,
    errorNotAuthed
}