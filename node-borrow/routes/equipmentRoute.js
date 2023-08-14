const express = require('express')
const equipmentController = require('../controllers/equipmentController')

const equipmentRound = express.Router()


// routerCustomer.post('/login',userController.login)
// routerRound.get('/getcustomer/:id',roundController.getCustomer) //
equipmentRound.get('/show-equipment',equipmentController.showEquipMent) // findall
equipmentRound.get('/get-equipment/:id',equipmentController.getEquipMent) // findone
equipmentRound.put('/edit-equipment/:id',equipmentController.editEquipMent) // update
equipmentRound.post('/add-equipment',equipmentController.addEquipMent)

module.exports = equipmentRound