const http = require('http')
const { DB } = require('./DB.js')

const usersArray = [
    {
        id: 1,
        username: 'Jony'
    },
    {
        id: 2,
        username: 'Galia'
    }
]
const users = new DB('users');
users.create(usersArray)

const server = http.createServer((req, res) => {
    res.write(JSON.stringify(users.get()));
    res.end();
})

server.listen(4000, () => {
    console.log('server is listening on port 4000')
})