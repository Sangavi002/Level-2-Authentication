const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./config/db");
const userRouter = require("./route/user.route");
const jwt = require("jsonwebtoken");

const app = express();
const port= process.env.PORT;

app.use(express.json());
app.use("/user",userRouter);

app.post("/token",(req,res) => {
    const refreshToken = req.body.token;
    jwt.verify(refreshToken,"masaischool",(err,decoded) => {
        if(err){
            res.send("Error occured.")
        }else{
            let accessToken = jwt.sign({email: decoded.email,username: decoded.username, role: decoded.role},"masai",{expiresIn: "1m"}) 
            res.send({accessToken}) 
        }
    })
})

app.listen(port,async() => {
    try{
        await connection
        console.log(`Server is running on port ${port} and db is connected.`)
    }catch(err){
        console.log(err);
    }
})
