const express =require('express')
const router =new express.Router()
const usercontrol =require('../controller/usercontroller')
const jwtmMiddleware = require('../middleWare/jwtMiddleware')
router.post('/register',usercontrol.register) 
router.post('/login',usercontrol.login) 
router.get('/view',jwtmMiddleware,usercontrol.allusersdetails)
module.exports=router