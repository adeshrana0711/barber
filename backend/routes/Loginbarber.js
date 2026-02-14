const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Barber = require('../models/Barber');

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        const barber = await Barber.findOne({ email });
        if (!barber || barber.password !== password) {
            return res.send("Invalid Email or Password");
        }

        const token = jwt.sign(
            {
                id: barber.id,
                role: "barber",
                email: barber.email
            },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: "2m" }   
        );

        res.clearCookie("token");

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        const redirectUrl = req.query.redirect || "/barber/dashboard";
        res.redirect(redirectUrl);

    }catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
