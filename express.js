const express = require('express');
const app = express();

//this "middleware" helps us get the content of the response body
app.use(express.json())
const { DB } = require('./DB.js');



//Endpoint = combination of url (path) & http method



app.use('/users', require('./routes/users.route'));
app.use('/tweets', require('./routes/tweets.route'));

//Create tweets route, with all of the 5 EndPoints what the users route have.

app.get('path', () => {})







app.listen(4000, () => {
    console.log('Express is listening on port 4000')
});