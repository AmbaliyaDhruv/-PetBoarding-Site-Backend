const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    firstname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    number:{type:Number,required:true},
    password:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

userSchema.pre("save",function(next){
    if(!this.isModified("password"))return next();

    var hash=bcrypt.hashSync(this.password,4);
    this.password=hash;
    return next();
});

userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

const User=mongoose.model("User",userSchema);

module.exports=User;


