const {Router}= require('express')
const Tagscontroller= require('../controllers/tags.controller')
const ensureAuthenticated= require('../middlewares/ensureAuthenticated')

const tagsRoutes= Router()


const tagscontroller= new Tagscontroller()
tagsRoutes.get('/',ensureAuthenticated,tagscontroller.index)

module.exports=tagsRoutes