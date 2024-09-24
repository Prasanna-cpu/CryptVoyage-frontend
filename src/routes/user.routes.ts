import express from "express";
import {deleteUserById, getAllUsers, getUserById, updateUserById} from "../controllers/user.controller";
import {verifyToken} from "../middleware/VerifyToken";


const userRouter = express.Router();

userRouter.get("/",getAllUsers)
userRouter.get("/:id",verifyToken,getUserById)
userRouter.put("/:id",verifyToken,updateUserById)
userRouter.delete("/:id",verifyToken,deleteUserById)

export default userRouter;