import { UserNotFound, UserAlreadyExists, IncorrectLoginCredentials, ElementNotFound, ElementAlreadyExist} from '../errors/error-exceptions.js'
import { generateToken, hashPass, verify } from '../utils/utils.js'
import { usersRepository, conversationsRepository, contactsListRepository } from '../repositories/index.js'

export default class UsersService {

    async getUsers() {
        const users = await usersRepository.getAll()
        
        if(!users){
            throw new UserNotFound(`Usuarios no encontrados`)
        }

        return users
    }

    async getById(userId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }
        
        return user
    }

    async register(user) {
        const userRegister = await usersRepository.getUserByEmailRegister(user.email_register)
        if(userRegister){
            throw new UserAlreadyExists(`El email ${user.email_register} ya está en uso, intenta con otro.`)
        }

        const newUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email_register: user.email_register,
            avatar_url: user.avatar_url || ''
        }

        const passwordHashed = hashPass(user.password)

        newUser.password = passwordHashed

        const result = await usersRepository.create(newUser)
        await this.addContactList(result._id)
        
        
        return result
    }

    async login(user) {
        const userData = await usersRepository.getUserByEmailRegister(user.email_register)

        if(!userData){
            throw new UserNotFound(`Usuario con email: ${user.email_register} no encontrado`)
        }

        const validatePass = verify(user.password, userData.password)

        if(!validatePass){
            throw new IncorrectLoginCredentials(`Credenciales incorrectas`)
        }

        const accessToken = generateToken(userData)

        return accessToken
    }

    async createContact(userId, contactId) {
        const user = await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`User with ID N°${user._id} not found`)
        }

        const userContact= await usersRepository.getById(contactId)

        if(!userContact){
            throw new UserNotFound(`User Contact with ID N°${user._id} not found`)
        }

        const result = await usersRepository.addContact(userId, contactId)


        return result
    }
    
    async addContactList(userId) {
        const user = await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const list = await contactsListRepository.createList(userId)
        const result = await usersRepository.addContactList(userId, list._id)
       
        return result
    }

    async addConverToUser(userId, converId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const convers = await usersRepository.getConvers(userId)
        if(!convers.conversations.includes(converId)){
            const result = await usersRepository.addConverToUser(userId, converId)
            return result
        }
    }

    async getConvers(userId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const convers = await usersRepository.getConvers(userId)

        if(convers.length === 0){
            throw new ElementNotFound(`No hay conversaciones todavía`)
        }

        return convers

    }

    async changeNickName(userId, nickName) {
         const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const result = await usersRepository.changeNickName(userId, nickName)

        return result
    }

    async changeFirstName(userId, firstName) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const result = await usersRepository.changeFirstName(userId, firstName)
        
        return result
    }

    async changeLastName(userId, lastName) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const result = await usersRepository.changeLastName(userId, lastName)

        return result
    }
    
    async changeEmailRegister(userId, emailRegister){
        const user = await usersRepository.getById(userId)
        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        if(newEmail === user.email_register){
            throw new ElementAlreadyExist(`El email ingresado ya está en uso, intenta con otro`)
        }

        const result = await usersRepository.changeEmailRegister(userId, emailRegister)

        return result
    }

    async changeVisibility(userId, visibility){
        const user = await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        if(user.visibility === visibility) {
            throw new ElementAlreadyExist(`Intenta cambiar la visibilidad`)
        }

        const result = await usersRepository.changeVisibility(userId, visibility)

        return result
    }

    async changeAvatar(userId, newAvatar) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const result =  await usersRepository.changeAvatar(userId, newAvatar)

        return result
    }

    async deleteUser(userId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`Usuario con Id N°${userId} no encontrado`)
        }

        const result = await usersRepository.deleteUser(userId)
        
        return result
    }

}