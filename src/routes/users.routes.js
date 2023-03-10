const {Router}= require('express')
const Userscontroller= require('../controllers/users.controller')
const Useravatarcontroller= require('../controllers/useravatar.controller')
const ensureAuthenticated= require('../middlewares/ensureAuthenticated')
const multer= require('multer')
const uploadConfig= require('../configs/upload')
const upload= multer(uploadConfig.MULTER)
const usersRoutes= Router()

const useravatarcontroller= new Useravatarcontroller()
const userscontroller= new Userscontroller()
usersRoutes.post('/',userscontroller.create)
usersRoutes.put('/',ensureAuthenticated,userscontroller.update)
usersRoutes.patch('/avatar', ensureAuthenticated,upload.single("avatar"),useravatarcontroller.update)
module.exports=usersRoutes