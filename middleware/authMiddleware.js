import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token
    
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1] // split the space so bearer is the zero index and the token is the one index 

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error) { // if there is error in the token 
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } 

    if(!token){ //if there is no token
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) { //to check that user is loged in and is admin
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }

}

export { protect, admin }