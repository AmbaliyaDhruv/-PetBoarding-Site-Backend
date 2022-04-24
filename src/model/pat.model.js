
const mongoose=require("mongoose");

const patSchema=mongoose.Schema({
    name:{type:String,required:true},
    type:{type:String,required:true},
    age:{type:Number,required:true},
    weight:{type:Number,required:true},
},{
    versionKey:false,
    timestamps:true
})


const Pat=mongoose.model("Pat",patSchema)

module.exports=Pat;