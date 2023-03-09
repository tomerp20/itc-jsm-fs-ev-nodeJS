const{ object, string, required, email, number, integer, positive} = require('yup')

/*
    username - required
    username - string
    username - maxChars - 20
    email - required
    email - string
    email - correct email address
    age - integer
    age - optional
*/

const userSchema = object({
    username: string().required(),
    email:  string().email().required(),
    age: number().integer().positive()
})
module.exports = { userSchema }