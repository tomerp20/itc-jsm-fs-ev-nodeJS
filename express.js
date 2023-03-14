const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors(`http://google.com`

))
console.log('sdf')
//Authentication - Making sure the client, is who he claims to be
app.use((req, res, next) => {
    console.log(req.query)
    const { apikey } = req.query;
    if(apikey === '1234') {
         return next()
    }
    res.send('You need to provide an apikey');
})





//Authorization  - deal with permissions, not with identifying the user



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