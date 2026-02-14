const express = require("express");
const router = express.Router();
const Barber = require("../models/Barber");

router.post("/add", async(req,res)=>{
    try{
        const barber = await Barber.create({
            name:req.body.name,
            location:req.body.location,
            skills:req.body.skills,
            status:req.body.status,
            shop:req.user.shopId
        });

        res.json(barber);
    }catch(err){
        res.status(500).json({error:"Failed"});
    }
});

router.get("/all", async (req,res)=>{
    const barbers = await Barber.find().sort({createdAt:-1});
    res.json(barbers);
});

router.patch("/status/:id", async (req,res)=>{
    const barber = await Barber.findById(req.params.id);

    barber.status = barber.status==="Active"?"Inactive":"Active";
    await barber.save();

    res.json(barber);
});

router.delete("/:id", async (req,res)=>{
    await Barber.findByIdAndDelete(req.params.id);
    res.json({success:true});
});

module.exports = router;
