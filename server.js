const http = require('http');
const { DB } = require('./DB.js');

const server = http.createServer((req, res) => {
    //Return list of users
    console.log('Url => ', req.url);
    console.log('Method => ', req.method);
    console.log('Headers => ', req.headers);
    const [nothing, db, id] = req.url.split('/');

    switch (db) {
        case 'users': {
            const users = new DB('users');
            if (id) {
                //send specif user
                const user = users.getItemById(id);
                res.write(JSON.stringify(user));
            }
            else {
                if(req.method === "POST") {
                    const newUser = {
                        id:4,
                        name:'Ana'
                    }
                    users.addItem(newUser)
                    res.write(JSON.stringify(newUser))
                }
                else {
                    res.write(JSON.stringify(users.get()));
                }
                
            }
            break;
        }
        case 'tweets': {
            const tweets = new DB('tweets');
            if (id) {
                //send specif tweets
                const tweet = tweets.getItemById(parseInt(id));
                res.write(JSON.stringify(tweet));
            }
            else {
                res.write(JSON.stringify(tweets.get()));
            }
            break;
        }
        default: {
            res.write("I'm not familiar with what you asked for")
        }

    }



    // if (db === 'users') {
    //     const users = new DB('users');
    //     if (id) {
    //         //send specif user
    //         const user = users.getItemById(id)
    //         res.write(JSON.stringify(user))
    //     }
    //     else {
    //         res.write(JSON.stringify(users.get()))
    //     }
    // }
    res.end();
})

server.listen(4000, () => {
    console.log('server is listening on port 4000')
})