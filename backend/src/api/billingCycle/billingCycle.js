//Use the node-restfull to manipulate mongoose (It can be done using moongose itself)
const restful = require('node-restful')
const mongoose = restful.mongoose

//Credit Schema
const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})
//Debit Schema
const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //Custom Required violation Message
    value: { type: Number, min: 0, required: [true, 'Debit Value is Required'] },
    status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

//BillingCycleSchema
const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debits: [debtSchema]
})

//Export the restful Model with billingcycle Schema
module.exports = restful.model('BillingCycle', billingCycleSchema)