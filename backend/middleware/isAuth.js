import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(403).json({
                message: "Please Login to Access"
            })
        }

        // decode jwt token
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decodeToken._id)
        next()
        
    } catch (error) {
        return res.status(403).json({
            message: error.message
        })
    }
}