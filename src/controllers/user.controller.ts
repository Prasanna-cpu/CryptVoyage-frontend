import {Response} from 'express';
import {AuthenticatedRequest} from "../middleware/VerifyToken";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";


export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try{

        const users=await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                username:true,
                avatar:true,
                createdAt:true
            }
        })

        return res.status(200).json({
            status:200,
            message:"Retrieved Users",
            payload:users
        })

    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:(err as Error).message
        })
    }
}

export  const getUserById = async (req: AuthenticatedRequest, res: Response) => {
    const id=req.params.id

    try{
        const selectedUser=await prisma.user.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                email:true,
                username:true,
                avatar:true,
                createdAt:true
            }
        })

        return res.status(200).json({
            status:200,
            message:"Retrieved User",
            payload:selectedUser
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:(err as Error).message
        })
    }
}

export const updateUserById = async (req: AuthenticatedRequest, res: Response) => {

    const id=req.params.id

    try{

        const tokenUserId=req.userId

        const {password,avatar,...inputs}=req.body

        if(!tokenUserId){
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated , please log in'
            })
        }

        if(id!==tokenUserId){
            return res.status(403).json({
                status: 403,
                message: 'Not authorized,access denied'
            })
        }
        let updatedPassword;

        if(password){
             updatedPassword=bcrypt.hashSync(password,10)
        }


        const updatedUser = await prisma.user.update({
            where:{id},
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            },
        })
        res.status(202).json({
            status:202,
            message:"Updated Successfully",
            payload:{
                id:updatedUser.id,
                username:updatedUser.username,
                email:updatedUser.email,
                avatar:updatedUser.avatar,
                createdAt:updatedUser.createdAt
            }
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:(err as Error).message
        })
    }
}

export const deleteUserById = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const id=req.params.id;
        const tokenUserId=req.userId

        if(!tokenUserId){
            return res.status(401).json({
                status: 401,
                message: 'Unauthenticated , please log in'
            })
        }

        if(id!==tokenUserId){
            return res.status(403).json({
                status: 403,
                message: 'Not authorized,access denied'
            })
        }

        await prisma.user.delete({
            where:{id},
        })

        return res.status(200).json({
            status:200,
            message:"User deleted successfully"
        })



    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:(err as Error).message
        })
    }
}