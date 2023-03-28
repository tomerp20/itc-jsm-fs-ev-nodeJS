const { errSchema } = require('../lib/responseHandlers')

const validateDto = (schema) => {
    return (req, res, next) => {
        const userInfo = req.body;
        console.log(userInfo)
        schema.validate(userInfo).then(() => { 
            next()
        }).catch((error) => {
            next(errSchema(error.errors))
        })
    }
}

module.exports = { validateDto }