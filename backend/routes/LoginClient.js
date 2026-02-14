const express = require('express');
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

router.post('/login',async (req, res) => {

    try{
    const { email, password } = req.body;
    const client = await Client.findOne({email,password});
    if (!client) {
        return res.send("Invalid Email or Password");
    }

    const token = jwt.sign(
    { id: client.id, email: client.email, role: "client" },
    process.env.JWT_SECRET,
    { expiresIn: "60s" }
    );
    res.cookie("token", token, { httpOnly: true });
        const redirectUrl = req.query.redirect || "/";
        res.redirect(redirectUrl);


}catch(error){
    console.log(error);
}
});

module.exports = router;