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
const errSchema = (message) => new ResponseHandler(422, false, message).createResponseFormat()

module.exports = {
    validResponse,
    errSchema
}