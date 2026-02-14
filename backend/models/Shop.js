const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    location:String
},{timestamps:true});

module.exports = mongoose.model("Shop",ShopSchema);