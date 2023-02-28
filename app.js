console.log('hello world')
const { tick } = require('./tick.js')
const { add, reduce } = require('./calculator.js')
const { createFile, readFile, deleteFile } = require('./fs')
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
const tweetsArray = [
    {
        id: 1,
        text: 'Some text'
    },
    {
        id: 2,
        text: 'Hello world'
    }
]




const users = new DB('users');
users.create(usersArray)
console.log(users.get())


const tweets = new DB('tweets');
tweets.create(tweetsArray)
console.log(tweets.get())

tweets.addItem({id:3,text:'blabla'})



// console.log(`The Sum of 5 and 7 is ${add(5,7)}`)















// createFile('Jony.txt')

// const fileValue = readFile('./Jony.txt')
// console.log(fileValue)


// tick()


// setTimeout(() => {
//     console.log('Second message')
// },5000)



//Create calculator file
//add(number1, number2) => 4+4=8
//Reduce(number1, number2) => 8-4=4
//export them
//Import them to app.js
//Use them, and print.









//Research in google how to read a content of a file
//Create a function that gets the file path and name and return it's contenxt
//console.log() the content of that file.















// Create app.js file
// write console.log() of something
//write code that print the word "Tick" every second, and stops after 15 seconds
//Run it!