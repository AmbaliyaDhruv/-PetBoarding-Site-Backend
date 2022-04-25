
const express=require("express");
const app=express()
const cors=require("cors");
const port=process.env.PORT || 8080;
const connect=require("./config/db")
const usersignup=require("./controller/user.controller");
const center=require("./controller/centerData.controller");
const pats=require("./controller/pat.controller");
const booking=require("./controller/booking.controller");
app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/create",center);
app.use("/pats",pats);
app.use("/authentication",usersignup)
app.use("/booking",booking)
app.listen(port,async()=>{
    try {
        connect();
        console.log(`http://localhost:${port}`)
    } catch (error) {
        console.log(error.message)
    }
    
})