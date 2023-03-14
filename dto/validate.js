const validateDto = (schema) => {
    return (req, res, next) => {
        const userInfo = req.body;
        schema.validate(userInfo).then(() => { 
            next()
        }).catch((error) => {
            res.send(error.errors)
        })
    }
}

module.exports = { validateDto }