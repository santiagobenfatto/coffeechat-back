import passport from 'passport'
import passportJwt from 'passport-jwt'
import config from '../config/config.js'
// import { customStrategy } from '../utils/strategiesEnum.js'

const JWTStrategy = passportJwt.Strategy
const JWTextractor = passportJwt.ExtractJwt

export const initAuth = ({app, io}) => {    
    setupPassport({app})
    setupSockets({io})
    socketsConfig({io})
}

const setupPassport = ({app}) => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTextractor.fromExtractors([cookieExtractor]),
        secretOrKey: config.privateKey
        },
        async (jwt_payload, done) => {
            try {
                //console.log(` Esto es el payload : ${jwt_payload}`)
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
    }))
    app.use(passport.initialize())
}
const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[config.cookieToken]
    } else if (req && req.headers.cookie){
        token = req.headers.cookie.split('=')[1]
    }
    return token
}

const setupSockets = ({io}) => {
    io.engine.use((req, res, next) => {
        let token
        if(req.headers.cookie){
            token = req.headers.cookie.split('=')[1]
        }
        
        if (token) {
          passport.authenticate("jwt", { session: false })(req, res, next)
        } else {
          next()
        }
      })
}

const socketsConfig = ({io}) => {
    io.use((socket, next) => {
        const data = socket.handshake.auth
        if(data){
            console.log(data)
        }
        next()
    })
}
