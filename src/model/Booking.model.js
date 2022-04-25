
const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    name:{type:String,required:true},
    OnBording:{type:String,required:true},
    offBording:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    centerId:{type:mongoose.Schema.Types.ObjectId,ref:"Center",required:true},
    status:{type:String,required:true,default:"pending"}
},{
    versionKey:false,
    timestamps:true
})


const Booking= mongoose.model("Booking",bookingSchema)

module.exports=Booking;

