import {Request,Response} from "express";
import {loginValidationSchema, registerValidationSchema} from "../validations/auth.validation";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken"

const secret= process.env.SECRET_KEY;
// console.log(secret)

export const register=async(req:Request,res:Response)=>{
    try{
        const {error}=registerValidationSchema.validate(req.body);

        if(error){
            return res.status(400).send({
                status:400,
                message:error.message,
            })
        }

        const {username,email,password}=req.body

        const hashedPassword=await bcrypt.hash(password,10);

        const existingUser=await prisma.user.findUnique({
            where:{
                username
            }
        })

        if(existingUser){
            return res.status(400).send({
                status:400,
                message:"User with given username already exists"
            })
        }


        const newUser=await prisma.user.create({
            data:{
                username,
                password:hashedPassword,
                email,
                avatar:`https://avatar.iran.liara.run/public/boy?username=${username}`
            }
        })

        return res.status(201).send({
            status:201,
            message:"Created New User",
            payload:{
                email:newUser.email,
                username:newUser.username,
                avatar:newUser.avatar
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


export const login=async(req:Request,res:Response)=>{
    try{

        const {error}=loginValidationSchema.validate(req.body)

        if(error){
            return res.status(400).send({
                status:404,
                message:error.message,
            })
        }

        const {username,password}=req.body

        const existingUser=await prisma.user.findUnique({
            where:{
                username
            }
        })

        if(!existingUser){
            return res.status(401).send({
                status:401,
                message:"Invalid credentials"
            })
        }

        const isValid=await bcrypt.compare(password,existingUser.password);

        if(!isValid){
            return res.status(401).send({
                status:401,
                message:"Invalid credentials"
            })
        }

        const age=1000*60*60*24*7

        const token=jwt.sign({
            id:existingUser.id,
            isAdmin:true
        },secret as string,{
            expiresIn:age
        })

        const { password: userPassword, ...userInfo } = existingUser;

        res.cookie("token", token, {
                httpOnly: true,
                maxAge: age,
            }).status(200).json({
            status:200,
            message:"Logged in successfully",
            payload:{
                userInfo
            }
        });



    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:(err as Error).message
        })
    }
}



export const logout=async(req:Request,res:Response)=>{
    try{
        return res.clearCookie("token").status(200).json({
            status:200,
            message:"Logged out successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:(err as Error).message
        })
    }
}