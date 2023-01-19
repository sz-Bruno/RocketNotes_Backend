const AppError= require('../utils/apperror')
const {hash}= require("bcryptjs")
class UserCreateService{
    constructor(userRepository){
        this.userRepository= userRepository
    }
    async execute({name,email,password}){
      
    
      const checkuserexists= await this.userRepository.findByEmail(email)
   
      if(checkuserexists){
      throw new AppError('Este email já está em uso')
     }
      const hashedpassword= await hash(password,8)
      const userCreated= await this.userRepository.create({name,email,password:hashedpassword})

      return userCreated
    }
}

module.exports= UserCreateService