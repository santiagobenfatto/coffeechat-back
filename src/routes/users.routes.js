import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import UsersController from '../controllers/users.controller.js'

const usersController = new UsersController()


export default class UsersRoutes extends Router{

    init() {
        this.get('/', ['USER', 'ADMIN'], customStrategy.JWT, usersController.getUsers)
        this.get('/user', ['USER', 'ADMIN'], customStrategy.JWT, usersController.getById)
        this.get('/user/convers', ['USER', 'ADMIN'], customStrategy.JWT, usersController.getConvers)

        this.post('/user/login', ['PUBLIC'], customStrategy.NOTHING, usersController.login)
        this.post('/user/register', ['PUBLIC'], customStrategy.NOTHING, usersController.register)
        this.post('/user/logout', ['USER', 'ADMIN'], customStrategy.JWT, usersController.logout)
        
        this.post('/user/check', ['USER', 'ADMIN'], customStrategy.JWT, usersController.verifySession)

        this.patch('/user/nickname', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeNickName)
        this.patch('/user/firstname', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeFirstName)
        this.patch('/user/lastname', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeLastName)
        //
        this.patch('/user/email-register', ['PUBLIC'], customStrategy.JWT, usersController.changeEmailRegister)
        
        this.patch('/user/visibility', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeVisibility)
        this.patch('/user/avatar', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeAvatar)

        this.delete('/user', ['ADMIN'], customStrategy.JWT, usersController.deleteUser)
    }
}