const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const shop = require('../models/Shop');

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        const shopName = await shop.findOne({ email });
        if (!shopName || shopName.password !== password) {
            return res.send("Invalid Email or Password");
        }

        const token = jwt.sign(
            {
                id: shopName._id,
                role: "shop",
                email: shopName.email
            },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: "2m" }   
        );

        res.clearCookie("token");

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        const redirectUrl = req.query.redirect || "/shop/dashboard";
        res.redirect(redirectUrl);

    }catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
