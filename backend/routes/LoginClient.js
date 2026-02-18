const express = require('express');
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const Shop = require('../models/Shop');

router.post('/login', async (req,res)=>{
try{
    const { email, password } = req.body;

    const client = await Client.findOne({ email, password });
    if (!client) {
        return res.send("Invalid Email or Password");
    }
    const token = jwt.sign(
        { id: client._id, email: client.email, role: "client" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    const next = req.query.next || "/";
    res.redirect(next);

}catch(error){
    console.log(error);
    res.send("Login error");
}
});


module.exports = router;
