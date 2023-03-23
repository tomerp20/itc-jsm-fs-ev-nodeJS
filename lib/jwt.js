const jwt = require('jsonwebtoken')
const privateKey = 'FD#$T^%$#^%JFDGFDGFD'
const jwtSign = (payload) => {
    const token = jwt.sign(payload, privateKey,{expiresIn:'1h'});
    return token;
}
const jwtVerify = (token) => {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
}

module.exports = {
    jwtSign,
    jwtVerify
}