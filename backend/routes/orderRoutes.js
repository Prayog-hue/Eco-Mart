const express = require ("express")
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router()

//@route GEt /api/orders/my-orders
//@desc Get logged in with users's orders
//accesss Private
router.get("/myorders", protect, async(req,res)=>{
    try {
        //Find all the orders for the authenticated user
        const orders = await Order.find({user: req.user._id}).sort({
            createdAt: -1}) //sort by most recent orders
            res.json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})
//route GET /api/orders/:id
//desc GET order details by id
//access Private
router.get("/:id", protect ,async(req,res)=>{
    try {
        const order =await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )
        if(!order){
            return res.status(404).json({message: "Order not found"})
        }
        //return the full order details
        res.json(order)
    } catch (error) {
       console.error(error);
       res.status(500).json({message: "server error"})
        
    }
})
module.exports = router;