//Get Mongoose that will be the database
const mongoose = require('mongoose')
//The Mongoose promise will get the promise from node
mongoose.Promise = global.Promise

//Will Export the Connection with Database
module.exports = mongoose.connect('mongodb://localhost/mymoney')

//Change The Default Error Message
mongoose.Error.messages.general.required = "The Attribute '{PATH}' is required"
mongoose.Error.messages.Number.min = "The '{VALUE}' is lower than minumum limit ('{MIN}')"
mongoose.Error.messages.Number.max = "The '{VALUE}' is higher than maximum limit ('{MAX}')"
mongoose.Error.messages.String.enum = "'{VALUE}' is not a valid for attribute '{PATH}'"
