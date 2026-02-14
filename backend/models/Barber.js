const mongoose = require("mongoose");

const BarberSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model("Barber", BarberSchema);