import { usersService } from '../services/index.js'
import UsersController from './users.controller.js'

export const usersController = new UsersController(usersService)
