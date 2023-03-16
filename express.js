const express = require('express');
const app = express();
//  const cors = require('cors')
//  app.use(cors())
const { validResponse , createdResponse } = require(`./lib/responseHandlers`)



//Authentication - Making sure the client, is who he claims to be
app.use((req, res, next) => {
    const { apikey } = req.query;
    if (apikey === '1234') {
        return next()
    }
    res.send('You need to provide an apikey');
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


//Preparation layer

//this "middleware" helps us get the content of the response body
app.use(express.json())

app.use((req, res, next) => {
    res.customSend = (responseHandler) => res.status(responseHandler.status).send(responseHandler.payload)

    res.ok = (data) => res.customSend(validResponse(data))
    res.create = (value) => res.customSend(createdResponse(value))
    next();
})


const { DB } = require('./DB.js');



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