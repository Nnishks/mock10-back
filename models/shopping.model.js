const mongoose= require("mongoose");

const Shopping = new mongoose.Schema({
    title:{type:String,required:true, unique:true},
    quantity:{type:Number,required:true},
    priority:{type:String},
    // dateAndTime:{{ timestamps: true }}
    description:{type:String,required:true}
},{ timestamps: true })

const model = mongoose.model("ShoppingData",Shopping);
module.exports=model;