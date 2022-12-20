const {Router}= require('express')
const Notescontroller= require('../controllers/notes.controller')
const ensureAuthenticated= require('../middlewares/ensureAuthenticated')

const notesRoutes= Router()


const notescontroller= new Notescontroller()
notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/',notescontroller.index)
notesRoutes.post('/',notescontroller.create)
notesRoutes.get('/:id',notescontroller.show)
notesRoutes.delete('/:id',notescontroller.delete)

module.exports=notesRoutes