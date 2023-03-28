const express = require('express')
const route = express.Router()
const { DB } = require('../DB.js');
const { tweetSchema }= require('../dto/tweet.schema')
const { validateDto } = require('../dto/validate.js')
const tweets = new DB('tweets');
const { errorNotAuthorized } = require('../lib/responseHandlers')
/*
1) Get    /tweets
2) Get    /tweets/:id
3) GET    /tweets/totalNumber 
4) POST   /tweets    {id:'',text:''} 
5) PUT    /tweets:id {id:'',text:''} 
6) DELETE /tweets:id
*/


route.get('/', (req, res) => {
    res.ok(tweets.get())
});

route.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(tweets.getItemById(id))
});

route.post('/', validateDto(tweetSchema), (req, res) => {
    const newTweet = tweets.addItem(req.body);
    res.send(newTweet);
})
route.put('/:id', validateDto(tweetSchema), (req, res) => {
    tweets.updateItem(req.body, req.params.id)
    res.send(`tweet updated`)
})

route.delete('/:id', (req, res) => {
    const { id } = req.params
    tweets.deleteItemById(id)
    res.send('tweet deleted')
})
//Create an endpoint that will return the total number of tweets
//It will be restricted to only admin users
//If the user is not an admin - send an error
//Check what type of error you should send in NDM docs, and if you need, add it to the responseHandlers.js file
route.get('/totalNumber', (req, res) => {
    if(!req.user.permissions.includes('admin')) {
        return next(errorNotAuthorized())
    }
    const totalNumber = tweets.get().length;
})





module.exports = route;
