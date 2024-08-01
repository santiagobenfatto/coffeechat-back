import express from 'express'
import { __dirname } from './utils/utils.js'
import cookieParser from 'cookie-parser'
import routerApp from './routes/app.routes.js'
import { initSockets } from './websockets/index.js'
import { initAuth } from './auth/index.js'
import { createServer } from 'node:http'
import './dao/dbConfig.js'
import config from './config/config.js'
import cors from 'cors'

const PORT = config.port || 3001
const app = express()
const httpServer = createServer(app)

const originURL = config.corsOrigin

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: originURL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))

app.use('/api', routerApp)

const io = initSockets(httpServer)
initAuth({app, io})


httpServer.listen(PORT, ()=> {
    console.log(`Server running and listening on port ${PORT}`)
})
