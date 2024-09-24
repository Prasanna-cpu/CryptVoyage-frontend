import {NextFunction, Request, Response} from 'express';

import jwt, {VerifyErrors} from "jsonwebtoken"
import {AuthenticatedRequest} from "../middleware/VerifyToken";



const secret=process.env.SECRET_KEY

export const shouldBeLoggedIn =async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    // console.log(req.userId)

    return res.status(200).json({
        status:200,
        message:"You are authenticated"
    })
}

export const shouldBeAdmin=async (req: Request, res: Response, next: NextFunction) => {
    const token=req.cookies?.token

    if(!token){
        return res.status(401).json({
            status: 401,
            message: 'No token provided'
        })
    }
    jwt.verify(token,secret as string,async(err:VerifyErrors|null,payload:any) => {
        if(err){
            return res.status(403).json({
                status: 403,
                message: 'Invalid token'
            })
        }

        if(!payload.isAdmin){
            return res.status(403).json({
                status: 403,
                message:"Access denied"
            })
        }
    })

    return res.status(200).json({
        status:200,
        message:"You are authenticated"
    })
}