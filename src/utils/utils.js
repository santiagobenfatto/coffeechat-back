import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password, salt)
    return hashPass
}
const verify = (password, hash) => {
    const salt = bcrypt.compareSync(password, hash)
    return salt
}

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: 60 * 60 })
    return token
}

export {
    hashPass,
    verify,
    generateToken,
    __dirname
}