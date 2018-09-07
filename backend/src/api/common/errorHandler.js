//errorHandle is Middleware 
const _ = require('lodash')


module.exports = (req, res, next) => {
    //Will get the bundle object.
    const bundle = res.locals.bundle

    //If There's errors
    if (bundle.errors) {
        //Get the Errors in the right format
        const errors = parseErrors(bundle.errors)
        //Change de Response status to 500 and return the object errors in the right format
        res.status(500).json({ errors })
    } else {
        next()
    }
}

//Get Full errors object and return just the message of each error
const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    //For Each error in the array, push the error message inside errors array
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    //Return all errors messages inside a array
    return errors
}