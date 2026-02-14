const mongoose = require('mongoose');

const appointmentSchema  = new mongoose.Schema({
    barber:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barber",
        required: true
    },
    client:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    date:String,
    time:String,
    status:{
        type:String,
        default:"Booked"
    }
}) 
module.exports = mongoose.model("Appointment ",appointmentSchema);