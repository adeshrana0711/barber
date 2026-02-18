const mongoose = require("mongoose");

const BarberSchema = new mongoose.Schema({
    fullname: String,
    phone: String,
    status: {
        type: String,
        default: "Active"
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("Barber", BarberSchema);
