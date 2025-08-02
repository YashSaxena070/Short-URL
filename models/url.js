const mongoose=require("mongoose");

//Schema
const urlSchema=new mongoose.Schema({
    shortId :{
      type:String,
      required:true,
      unique:true
    },
    redirectedURL:{
      type:String,
      required:true,
    },
    visitedHistory: [{timestamp:{ type : Number}}],
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref : "users",
    },
},{timestamp:true});

//model

const URL=mongoose.model("url",urlSchema);

module.exports=URL;