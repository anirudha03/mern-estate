import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js' //for signup
import listingRouter from './routes/listing.route.js'
import { nextTick } from "process";
import cookieParser from "cookie-parser";
import path from "path"

// import companyRoutes from './routes/companyRoutes.js'

import cors from 'cors'


dotenv.config();
const __dirname = path.resolve();

const app = express();
app.use(express.json()); // with this we can pass json parameters { "usename":"kmkm", .....}
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to the database");
}).catch((err)=>{
    console.log(err);
});


app.listen(3000, ()=>{
    console.log('server is running on port 3000');
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use((err, req, res, next) => {      //this used to set success as false when an err is detected then this success is used as reference 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

