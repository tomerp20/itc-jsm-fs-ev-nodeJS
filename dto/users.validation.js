
const { userSchema } = require('./users.schema')


const addUserValidation =  (req, res, next) => {
        const userInfo = req.body;
        console.log(userInfo)
        userSchema.validate(userInfo).then(() => { 
            next()
        }).catch((error) => {
            res.send(error.errors)
        })
    }



module.exports = { addUserValidation };