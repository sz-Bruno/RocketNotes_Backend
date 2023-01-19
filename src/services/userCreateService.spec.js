const UserCreateService= require("./UserCreateService")
const UserRepositoryInMemory= require("../repositories/UserRepositoryInMemory")
const AppError= require('../utils/apperror')


describe("CreateService",()=>{
    it("user should be created", async ()=>{
    
        const user={
            name:"user",
            email:"user@mail.com",
            password:"123"
        }
        const userRepositoryInMemory= new UserRepositoryInMemory()
        const userCreateService= new UserCreateService(userRepositoryInMemory)
        const userCreated =  await userCreateService.execute(user)
        
        
        expect(userCreated).toHaveProperty("id")
    
    })
    it("shold not create user with exists email", async()=>{
        const user1={
            name:"user test 1",
            email:"newuser@example.com",
            password:"123"
        }
        const user2={
            name:"user test 2",
            email:"newuser@example.com",
            password:"456"
        }

        const userRepository= new UserRepositoryInMemory()
        const userCreateService= new UserCreateService(userRepository)
       await  userCreateService.execute(user1)
       await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('Este email já está em uso'))
       
           
    })
})
