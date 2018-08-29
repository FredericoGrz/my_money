const express = require('express')

module.exports = function (server) {
    //URL BASE for all routes
    //All Urls that starts with '/api/ will use this router
    const router = express.Router()
    server.use('/api', router)

    //BillingCycle Routes
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    //Register a BillingCycles inside the API router
    BillingCycle.register(router, '/billingCycles')
}
