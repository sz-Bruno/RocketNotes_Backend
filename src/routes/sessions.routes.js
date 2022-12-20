const {Router}= require('express')

const Sessionscontroller = require('../controllers/sessionscontroller')

const sessionscontroller= new Sessionscontroller()

const sessionsRoutes= Router()

sessionsRoutes.post('/', sessionscontroller.create)

module.exports= sessionsRoutes