//Get the Billingcycle Schema
const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

//Methods that BillingCycle must have
BillingCycle.methods(['get', 'post', 'put', 'delete'])
//When updates will return the object updated
//When Update will execute the validations again
BillingCycle.updateOptions({ new: true, runValidators: true })

//Apply The ErrorHandle Middleware after a post and put request
BillingCycle.after('post', errorHandler).after('put', errorHandler)
//Create a route that return the Billing Cycle Count
BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            return res.json({ value })
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    //Using Pipe Line (Each object results will be used in the next one)
    BillingCycle.aggregate([{
        // For One BillingCycle will project 2 variable that sum all the credits and other one to sum all the debts about one billingcycle
        $project: {
            credit: { $sum: "$credits.value" },
            debt: { $sum: "$debits.value" }
        }
    }, {
        //Will Get All BillingCycle (grouping by id null) and sum all credits and all debts of all billing cycles
        $group: {
            _id: null,
            credit: { $sum: "$credit" }, debt: { $sum: "$debt" }
        }
    }, {
        //Will return one object with 2 values "Credit, Debt"
        $project: { _id: 0, credit: 1, debt: 1 }
    }]).exec((error, result) => { //Callback Function
        //If There's error
        if (error) {
            //Return a json object with the error inside an array
            res.status(500).json({ errors: [error] })
            //There's no error
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

//Export the billingcycle Model with Methods
module.exports = BillingCycle