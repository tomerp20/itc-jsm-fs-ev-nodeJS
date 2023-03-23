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
    username: string().required().strict(),
    email:  string().email().required(),
    age: number().integer().positive()
})

const registrationSchema = object( {
    username: string().required().strict(),
    password: string().required(),
    email:  string().email().required(),
})
const loginSchema = object( {
    username: string().required().strict(),
    password: string().required(),
})
module.exports = { userSchema, registrationSchema, loginSchema }