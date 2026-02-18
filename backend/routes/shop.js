const express = require("express");
const router = express.Router();

const Shop = require("../models/Shop");
const Barber = require("../models/Barber");
const auth = require("../middlewares/auth");

router.get("/:id/data", async (req,res)=>{

    const shop = await Shop.findById(req.params.id);

    const barbers = await Barber.find({
        shop: req.params.id
    });

    res.json({ shop, barbers });
});

router.post("/timing",auth("shop"),async (req,res)=>{
    const {open,close,slotDuration} = req.body;

      await Shop.findByIdAndUpdate(req.user.id,{
        workingHours:{
            open,
            close
        },
        slotDuration
    });

    res.send("Timing Updated");
})
module.exports = router;
