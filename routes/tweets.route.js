const express = require('express')
const route = express.Router()
const { DB } = require('../DB.js');
const { tweetSchema }= require('../dto/tweet.schema')
const { validateDto } = require('../dto/validate.js')
const tweets = new DB('tweets');

/*
1) Get    /tweets
2) Get    /tweets/:id
3) POST   /tweets    {id:'',text:''} 
4) PUT    /tweets:id {id:'',text:''} 
5) DELETE /tweets:id
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

module.exports = route;
