import mongoose from "mongoose";



const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:Number,
        required:true,
        allowNull:false,
    },
   
  },
  {
    timestamps:true,
  },
);

export const UsersModel = mongoose.model("Users", UsersSchema)