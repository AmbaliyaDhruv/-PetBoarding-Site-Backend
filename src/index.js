
const express=require("express");
const app=express()
const cors=require("cors");
const port=process.env.PORT || 8080;
const connect=require("./config/db")
const center=require("./controller/centerData.controller")
app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/create",center);
app.listen(port,async()=>{
    try {
        connect();
        console.log(`http://localhost:${port}`)
    } catch (error) {
        console.log(error.message)
    }
    
})