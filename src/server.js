
require('express-async-errors')
require("dotenv/config")
const AppError=require('./utils/apperror')
const migrationrun= require('./database/sqlite/migrations')
const express= require('express')
const routes = require('./routes')
const uploadConfig=require('./configs/upload')
const cors= require('cors')
migrationrun()
const app= express()
app.use(cors())
app.use(express.json())
app.use("/files",express.static(uploadConfig.UPLOAD_FOLDER))
app.use(routes)

app.use((error,request,response,next)=>{
if(error instanceof AppError){
   return response.status(error.statuscode).json({
      status:'error',
      message: error.message
   })
 }

  console.error(error)
  return response.status(500).json({
   status:'error',
   message:' Internal server error'
  })
})
const PORT= process.env.PORT || 3333

app.listen(PORT,()=>{`Estou ouvindo na Port ${PORT}`})