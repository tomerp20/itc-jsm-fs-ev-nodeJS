const fs = require('fs')

//Create a file with Node
const createFile = (name) => {
    fs.writeFileSync(name,'Hello World')
    console.log('File Created')
}
const readFile = (path) => {
    return fs.readFileSync(path,`utf-8`)
}
const deleteFile = (path) => {
    fs.unlinkSync(path)
    console.log('file deleted')
}


module.exports = {
    createFile,
    readFile,
    deleteFile
}