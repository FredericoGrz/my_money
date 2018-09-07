//Server Configuration

//Server's port
const port = 3003

//MIDDLEWARES
//When Recive a request, transform the request in a data object
const bodyParser = require('body-parser')
//Require the Express that will be used as a backend server
const express = require('express')
//Return a Express'server
const server = express()
//Return Middleware to allowCors
const allowCors = require('./cors')
//Return Middleware to understand when parameter in a request is a int number
const queryParser = require('express-query-int')


//For all Requests that starts with '/api/' if comes in urlencoded format, will use bodyparser to manage the requests
//server.use('/api', bodyParser.urlencoded({ extended: true }))

//For all Requests if comes in urlencoded format, will use bodyparser to manage the requests
//The Extended makes the urlencoded limit larger 
server.use(bodyParser.urlencoded({ extended: true }))
//For all Requests if comes in json format, will use bodyparser to manage the requests
server.use(bodyParser.json())
//Will accept request from another url
server.use(allowCors)
//All Request with number parameter it will change from String to Number
server.use(queryParser())
//Start to Listen the door
server.listen(port, function () {
    //Log in a console
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server