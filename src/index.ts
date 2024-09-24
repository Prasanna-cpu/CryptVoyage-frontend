import express,{Request,Response,NextFunction} from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./routes/auth.routes";
import testRouter from "./routes/test.routes";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
dotenv.config()

const app=express()

const port=process.env.PORT

const url=process.env.CLIENT_URL;


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:url as string,
    credentials:true
}))



app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World!");
})

//routes middleware
app.use("/api/auth",authRouter)
app.use("/api/test",testRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)




app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});

