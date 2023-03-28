const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const { validResponse , createdResponse, errorNotAuthed } = require(`./lib/responseHandlers`)
const { jwtVerify } = require('./lib/jwt')
const { DB } = require('./DB.js');

//Preparation layer

//this "middleware" helps us get the content of the response body
app.use(express.json())

app.use((req, res, next) => {
    res.customSend = (responseHandler) => res.status(responseHandler.status).send(responseHandler.payload)
    res.ok = (data) => res.customSend(validResponse(data))
    res.create = (value) => res.customSend(createdResponse(value))
    next();
})

//Authentication - Making sure the client, is who he claims to be
app.use((req, res, next) => {
    const openEndpoints = ['/users/registration','/users/login']
    console.log(req.url)
    if(openEndpoints.includes(req.url)) {
        return next()
    }

    const { authorization } = req.headers;
     if(!authorization) {
         return next(errorNotAuthed())
     }
    try {
        const decodedValue = jwtVerify(authorization.slice(7));
        const users = new DB('users');
        const user = users.getItemById(decodedValue.id)
        if(!user) {
            //this will cause an error inside the server
            //To be handled in the future
            return next('user was not found')
        }
        req.user = decodedValue;
        return next();
      } catch(err) {
        console.log(err)
        return next(errorNotAuthed())
      }

})


/*
{
    success : true/false
    data: ResponseData
    
    if(success === true)
        data = ResponseData
    else 
        message  = 'ErrorMessage
}

*/




//Authorization  - deal with permissions, not with identifying the user






//Endpoint = combination of url (path) & http method

app.use('/users', require('./routes/users.route'));
app.use('/tweets', require('./routes/tweets.route'));


//Error handling layer
app.use((err, req, res, next) => {
    console.log(`ERROR => ${err}`)
    res.customSend(err)
})







app.listen(4000, () => {
    console.log('Express is listening on port 4000')
});