const express = require('express')
const borrowController = require('../controllers/borrowController')

const borrowRound = express.Router()


// routerCustomer.post('/login',userController.login)
borrowRound.get('/show-borrow',borrowController.showBorrow) //
borrowRound.post('/add-borrow',borrowController.addBorrow)
borrowRound.put('/return-borrow/:id',borrowController.returnBorrow)

module.exports = borrowRound