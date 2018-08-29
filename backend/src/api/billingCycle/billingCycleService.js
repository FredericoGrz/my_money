//Get the Billingcycle Schema
const BillingCycle = require('./billingCycle')

//Methods that BillingCycle must have
BillingCycle.methods(['get', 'post', 'put', 'delete'])
//When updates will return the object updated
//When Update will execute the validations again
BillingCycle.updateOptions({ new: true, runValidators: true })

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

//Export the billingcycle Model with Methods
module.exports = BillingCycle