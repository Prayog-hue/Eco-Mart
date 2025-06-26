const express = require("express")
const router= express.Router()
const Subscriber = require("../models/Subscriber")

//@route POST /api/subscribe
//desc handle newsletter subscription
//access Public
 router.post("/subscribe", async(req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message: "Email is Required"})
    }
    try {
        //check if the email is already subscribed
        let subscriber = await Subscriber.findOne({email})

        if(subscriber){
            return res.status(400).json({message:"Email is already subscribed"})
        }

        //Create a new subscriber if the email is not subscribed
        subscriber = new Subscriber({email})
        await subscriber.save()

        res.status(201).json({message: "Successfully Subscribed to newsletter!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error1", error: error.message})
    }

 })
module.exports = router;
 