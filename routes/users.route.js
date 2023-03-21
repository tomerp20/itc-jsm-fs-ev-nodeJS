const express = require('express')
const route = express.Router()
const { DB } = require('../DB.js');
const users = new DB('users');
const { userSchema, registrationSchema } = require('../dto/user.schema')
const { validateDto } = require('../dto/validate')
const { userConflictError } = require(`../lib/responseHandlers`)
/*
1) Get    /users
2) Get    /user/:id
3) POST   /users    {id:'',name:''} 
4) PUT    /users:id {id:'',name:''} 
5) DELETE /users:id
*/

route.get('/', (req, res) => {
    const usersList = users.get();
    res.ok(usersList)
});

route.get('/:id', (req, res, next) => {
    const { id } = req.params
    if(id == 0) {
        return next('Invalid id')
    }
    res.ok(users.getItemById(id))
});
route.post('/registration', validateDto(registrationSchema), (req, res, next) => {

    //To validate that this user doesn't alredy exist
    const { email } = req.body;
    const usersList = users.get();
    const user = usersList.find(u => u.email === email);
    if(user) {
       return next(userConflictError())
    }


    const newUser = users.addItem(req.body)
    res.create(newUser)
})





route.post('/', validateDto(userSchema),(req, res) => {
    const newUser = users.addItem(req.body);
    res.create(newUser);
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