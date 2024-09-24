import {Request, Response , NextFunction} from 'express';

import jwt, {VerifyErrors} from "jsonwebtoken";

const secret=process.env.SECRET_KEY

export interface AuthenticatedRequest extends Request{
    userId?:string
}


export const verifyToken = (req:AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token=req.cookies?.token;

    if(!token){
        return res.status(401).json({
            status: 401,
            message: 'No token provided'
        })
    }


    jwt.verify(token,secret as string,(err:VerifyErrors|null,payload:any) => {
        if(err){
            return res.status(403).json({
                status: 403,
                message: 'Invalid token'
            })
        }

        if(payload && typeof payload.id==="string"){
            req.userId=payload.id
        }
        else{
            return res.status(403).json({
                status: 403,
                message:"Invalid token"
            })
        }

        next();
    })


}