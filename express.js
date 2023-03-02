const express = require('express');
const app = express();

//this "middleware" helps ys get the content of the response body
app.use(express.json())
const { DB } = require('./DB.js');

//Cors

//Endpoint = combination of url (path) & http method
app.get('/users', (req, res) => {
    const users = new DB('users');
    res.send(users.get())
});

app.post('/users', (req, res) => {
    const users = new DB('users');
    console.log(req.body);
    const newUser = users.addItem(req.body);
    res.send(newUser);
})

app.get('/tweets', (req, res) => {
    const tweets = new DB('tweets');
    res.send(tweets.get())
});






app.listen(4000, () => {
    console.log('Express is listening on port 4000')
});