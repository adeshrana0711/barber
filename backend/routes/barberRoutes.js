const express = require("express");
const router = express.Router();
const Barber = require("../models/Barber");
const auth = require("../middlewares/auth");

router.get("/all", auth("shop"), async (req,res)=>{
    const barbers = await Barber.find({shop:req.user.id});
    res.json(barbers);
});

   router.post("/add", auth("shop"), async (req,res)=>{
    try{
        console.log("BODY:",req.body);
        console.log("USER:",req.user);

        const barber = new Barber({
            name:req.body.name,
            location:req.body.location,
            skills:req.body.skills,
            status:req.body.status,
            shop:req.user.id
        });

        await barber.save();

        res.json(barber);

    }catch(err){
        console.log("ADD BARBER ERROR:",err.message);
        res.status(500).send(err.message);
    }
});

router.patch("/status/:id", auth("shop"), async(req,res)=>{
    const barber = await Barber.findOne({_id:req.params.id, shop:req.user.id});

    if(!barber) return res.status(404).send("Not allowed");

    if(barber.status === "Active"){
        barber.status = "Inactive";
    }
    else{
        barber.status = "Active";
    }
    await barber.save();

    res.json(barber);
});

router.delete("/:id", auth("shop"), async(req,res)=>{
    await Barber.deleteOne({_id:req.params.id, shop:req.user.id});
    res.send("Deleted");
});

module.exports = router;
