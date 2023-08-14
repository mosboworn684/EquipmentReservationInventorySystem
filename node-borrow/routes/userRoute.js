const express = require('express')
const userController = require('../controllers/userController')

const routerUser = express.Router()


routerUser.post('/login',userController.login)
routerUser.post('/authen',userController.authen)
routerUser.get('/getuser/:id',userController.getUser)
routerUser.get('/showuser',userController.showUser)
routerUser.post('/adduser',userController.addUser)
routerUser.put('/edituser/:id',userController.editUser)
routerUser.delete('/deleteuser/:id',userController.deleteUser)

module.exports = routerUser