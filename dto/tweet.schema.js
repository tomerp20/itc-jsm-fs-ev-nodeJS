const{ object, string } = require('yup')

/*
Create tweets schema
name - required
name - string

optional property
text - string
*/

const tweetSchema = object({
    name: string().required(),
    text:  string()
})
module.exports = { tweetSchema }