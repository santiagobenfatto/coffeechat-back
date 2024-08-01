import { UserNotFound, UserAlreadyExists, IncorrectLoginCredentials, ElementNotFound, ElementAlreadyExist} from '../errors/error-exceptions.js'
import config from '../config/config.js'
//import UsersService  from '../services/users.service.js'
import { usersService } from '../services/index.js'
//const usersService = new UsersService()

export default class UsersController{
    async getUsers (req, res) {
        try {
            const users = await usersService.getUsers()

            res.send({status: 'Success', users})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async getById (req, res) {
        try {
            const userId = req.user._id

            if(!userId) {
                return res.status(400).send({message: `Missing fields`})
            }

            const user = await usersService.getById(userId)

            res.send({status: 'Success', user})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async register (req, res) {
        try {
            const { first_name, last_name, email_register, password } = req.body

            if( !first_name || !last_name || !email_register || !password  ) {
                return res.status(400).send({message: `Incomplete values`})
            }
            
            const register = await usersService.register({ ...req.body })

            res.send({status: 'Success', register})
        

        } catch (error) {
            if(error instanceof UserAlreadyExists){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async login (req, res) {
        try {
            const { email_register, password } = req.body
            if ( !email_register || !password ){
                return res.status(400).send({message: `Incomplete values`})
            }
            
            const accessToken = await usersService.login({...req.body})
            
            res.cookie(
                config.cookieToken, accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true,
                sameSite: 'strict' }
            ).send({message: 'Authorized'})
            
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof IncorrectLoginCredentials){
                return res.status(401).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async logout (req, res) {
        try {
            res.cookie(
                config.cookieToken, "" , {maxAge: 0, httpOnly: true, sameSite: 'strict'}
            ).send({message: 'Logout'})

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async verifySession (req, res) {
        try {
            res.json({'message': 'Authenticated'})            
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async getConvers (req, res) {
        try {
            const userId = req.user._id
            
            if( !userId ){
                return res.status(403).send({message: `Forbidden`})
            }

            const convers = await usersService.getConvers(userId)

            res.send({status: 'Success', convers})
            
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeNickName (req, res) {
        try {
            const { nickname } = req.body
            const userId = req.user._id

            if(!nickname){
                return res.status(400).send({message: `Incomplete values`})
            }
            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            const user = await usersService.changeNickName(userId, nickname)

            res.send({status: 'Success', message: `User nickname has benn changed to ${user.nickname}`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeFirstName (req, res) {
        try {
            const { firstName } = req.body
            const userId = req.user._id
            
            if( !firstName ){
                return res.status(400).send({message: `Incomplete values`})
            }

            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            const user = await usersService.changeFirstName(userId, firstName)
            
            res.send({status: 'Success', message: `User first name has been changed to ${user.first_name}`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeLastName (req, res) {
        try {
            const { lastName } = req.body
            const userId = req.user._id

            if(!lastName ){
                return res.status(400).send({message: `Missing fields`})
            }
            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            const user = await usersService.changeLastName(userId, lastName)
            
            res.send({status: 'Success', message: `User lastname has been changed to ${user.last_name}`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeEmailRegister (req, res) {
        try {
            const { emailRegister } = req.body
            const userId = req.user._id

            if(!emailRegister){
                return res.status(404).send({message: error.message})
            }
            
            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            await usersService.changeEmailRegister(userId, emailRegister)

            res.send({status: 'Success', message: 'Email changed succesfully'})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeVisibility (req, res) {
        try {
            const { visibility } = req.body
            const userId = req.user._id

            if(!visibility){
                return res.status(404).send({message: error.message})
            }

            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            await usersService.changeVisibility(userId, visibility)

            res.send({status: 'Success', message: 'Visibility changed succesfully'})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof ElementAlreadyExist){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
    async changeAvatar (req, res) {
        try {
            const { avatar } = req.body
            const userId = req.user._id

            if(!avatar){
                return res.status(404).send({mesage: 'Missing fields'})
            }

            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            await usersService.changeAvatar(userId, avatar)

            res.send({status: 'Success', message: 'The avatar has changed'})
            
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof ElementAlreadyExist){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async deleteUser (req, res) {
        try {
            const userId = req.user._id
            const { userToDelete } = req.body

            if(!userId){
                return res.status(403).send({message: `Forbidden`})
            }

            if(!userToDelete){
                return res.status(400).send({message: `Missing fields`})
            }

            const userDelete = await  usersService.deleteUser(userToDelete)

            res.send({status: 'Success', message: `User with ID${userDelete._id} was deleted`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

}