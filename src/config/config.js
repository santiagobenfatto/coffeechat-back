import dotenv from 'dotenv'

dotenv.config({path: '.env.dev'})

export default {
    mongoUrl: process.env.MONGO_URL,
    privateKey: process.env.PRIVATE_KEY,
    cookieToken: process.env.COOKIE_TOKEN,
    port: process.env.PORT
}