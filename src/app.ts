import express, { Application} from "express";
import userRoutes from "./routes/user.routes";
import {connectDB} from "./config/db"
const app: Application = express();

app.use(express.json());
connectDB()
app.use('/user',userRoutes)

const PORT = 3005;
app.listen(PORT,()=>{
    console.log('server started');
    
})

