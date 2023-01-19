const {hash, compare}= require("bcryptjs")
const UserRepository= require("../repositories/UserRepository")
const UserCreateService= require("../services/userCreateService")
const AppError= require('../utils/apperror')
const sqliteconection= require('../database/sqlite')
class Userscontroller{
   async create(request,response){
    
   const {name, email,password}= request.body
   const userRepository= new UserRepository()
   const userCreateService= new UserCreateService(userRepository)
   await userCreateService.execute({name, email,password})
    return response.status(201).json()
}
 async update(request,response){
  const {name,email,password,old_password}= request.body
  const user_id= request.user.id
  const database= await sqliteconection()
  const user= await database.get('SELECT * FROM users WHERE id=(?)',[user_id])

  if(!user){
   throw new AppError('Usuário não encontrado')
 }
 const userupdatedemail= await database.get('SELECT * FROM users WHERE email=(?)', [email])

 if( userupdatedemail && userupdatedemail.id !== user.id){
   throw new AppError('Este email já está cadastrado')
 }
 user.name= name ?? user.name
 user.email=email ?? user.email

 if(password && !old_password){
  throw new AppError('Você precisa informar a senha antiga')
 }
if(password && old_password){
  const checkoldpassword= await compare(old_password,user.password)
  if(!checkoldpassword){
    throw new AppError(' A senha antiga não procede')
  }
  user.password=await hash(password,8)
}
 await database.run(`
 UPDATE users SET
 name =?,
 email=?,
 password=?,
 updated_at= DATETIME('now')
 WHERE id=?`,
 [user.name,user.email,user.password, user_id])
  return response.json()
 }


}

module.exports= Userscontroller