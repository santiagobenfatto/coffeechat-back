import { Router as expressRouter } from 'express'
import { customStrategy } from '../utils/strategiesEnum.js'
import passport from 'passport'

export default class Router{
    constructor(){
        this.router = expressRouter()
        this.init()
    }
    
    getRouter (){
        return this.router
    }

    init() { }

    get(path, role, strat, ...callbacks){
        this.router.get(
            path,
            this.passportStrategy(strat),
            this.authLevel(role),
            this.applyCallbacks(callbacks)
        )
    }

    post(path, role, strat, ...callbacks){
        this.router.post(
            path,
            this.passportStrategy(strat),
            this.authLevel(role),
            this.applyCallbacks(callbacks)
        )
    }
    put(path, role, strat, ...callbacks){
        this.router.put(
            path,
            this.passportStrategy(strat),
            this.authLevel(role),
            this.applyCallbacks(callbacks)
        )
    }

    patch(path, role, strat, ...callbacks){
        this.router.patch(
            path,
            this.passportStrategy(strat),
            this.authLevel(role),
            this.applyCallbacks(callbacks)
        )
    }


    delete(path, role, strat, ...callbacks){
        this.router.delete(
            path,
            this.passportStrategy(strat),
            this.authLevel(role),
            this.applyCallbacks(callbacks)
        )
    }


    passportStrategy = (strategy) => (req, res, next) => {
        if(strategy === customStrategy.JWT) {
            passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err)
            if (!user) { 
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString()
                })
            }
            req.user = user
            next()
        })(req, res, next)
        } else {
            next()
        }
    }

    authLevel = (role) => (req,res,next) => {
        if(role[0] === 'PUBLIC') return next()

        if(!role.includes(req.user.role.toUpperCase())) {
            res.status(403).send({message: 'Forbidden'})
        }
        next()
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);//req, res, next
            } catch (error) {
                params[1].status(500).json({ error: error.message });
            }
        })
    }

    

}