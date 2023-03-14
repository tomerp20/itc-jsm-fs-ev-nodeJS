const express = require('express')
const route = express.Router()
const { DB } = require('../DB.js');
const users = new DB('users');
const { addUserValidation } = require('../dto/users.validation')
/*
1) Get    /users
2) Get    /user/:id
3) POST   /users    {id:'',name:''} 
4) PUT    /users:id {id:'',name:''} 
5) DELETE /users:id
*/

route.get('/', (req, res) => {
    res.send(users.get())
});

route.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(users.getItemById(id))
});

route.post('/', addUserValidation,(req, res) => {
    const newUser = users.addItem(req.body);
    res.send(JSON.stringify(newUser));
})
route.put('/:id',(req, res) => {
    users.updateItem(req.body, req.params.id)
    res.send(`user updated`)
})

route.delete('/:id', (req, res) => {
    const { id } = req.params
    users.deleteItemById(id)
    res.send('item deleted')
})

module.exports = route;