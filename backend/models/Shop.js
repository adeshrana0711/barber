const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name: String,
    location: String,
    email: String,
    password: String,
    workingHours:{
        open:String,
        close:String
    },
    slotDuration:{
        type:Number,
        default:30
    }
},{timestamps:true});

module.exports = mongoose.model("Shop", ShopSchema);
