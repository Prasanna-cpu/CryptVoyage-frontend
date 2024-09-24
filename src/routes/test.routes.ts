import express from "express";
import {shouldBeAdmin, shouldBeLoggedIn} from "../controllers/test.controller";
import {verifyToken} from "../middleware/VerifyToken";

const testRouter=express.Router();


testRouter.get("/logged-in",verifyToken,shouldBeLoggedIn)
testRouter.get("/is-admin",shouldBeAdmin)



export default testRouter;