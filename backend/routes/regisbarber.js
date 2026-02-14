const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

router.post('/registration', async (req, res) => {
    try {

        const { fullname, email, phone, password, location } = req.body;

        const existing = await Barber.findOne({ email });
        if (existing) {
            return res.json({ message: "Barber already exists" });
        }

        const barber = new Barber({
            name: fullname,
            email,
            phone,
            password,
            location
        });

        await barber.save();

        res.json({ message: "Barber Registered Successfully" });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
