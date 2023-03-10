const knex =require('../database/knex')
const AppError= require('../utils/apperror')
const {compare} = require('bcryptjs')
const authconfig= require('../configs/auth')
const {sign} = require("jsonwebtoken")
class sessionscontroller{
    async create(request,response){
        const {email,password}=request.body

        const user= await knex('users').where({email}).first()
        if(!user){
            throw new AppError('E-mail e/ou senha incorreta', 401)
        }
        const passwordMatched= await compare(password, user.password)
        if(!passwordMatched){
            throw new AppError('E-mail e/ou senha incorreta',401)
        }
        
        const {secret, expiresIn}= authconfig.jwt
        const token= sign({},secret,{
            subject: String(user.id),
            expiresIn
        })
        return response.json({token, user})
    }
    
}

module.exports=sessionscontroller