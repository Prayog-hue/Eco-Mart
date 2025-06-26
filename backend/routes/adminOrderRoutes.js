const express = require("express")
const order = require("../models/Order")
const { protect, isAdmin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

 const router = express.Router()

 //route get /api/admin/orders
 //desc fetch all the orders
 //access private/admin only 

router.get("/", protect , isAdmin , async(req,res)=>{
    try {
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders)
    } catch (error) {
        console.error(error)
            res.status(500).json({message: "server Error", error:error.message})
        
    }

})

//route put/api/admin/orders/:id
//desc update order status 
//access private / admin
router.put("/:id", protect, isAdmin , async(req,res)=>{
    try {
        const order= await Order.findById(req.params.id)
       if(order){
        order.status = req.body.status || order.status
        order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = req.body.status === "Delivered" ? Date.now(): order.deliveredAt
        const updateOrder = await order.save()
        res.json(updateOrder)
       } else{
        res.status(400).json({message: "Order Doesn't Exist"})
       }
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message})
        
    }
})
//route to delete an order
//  /api/admin/orders/:id
//access private/admin only
router.delete("/:id", protect, isAdmin , async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id)
    if(order){
        await order.deleteOne()
        res.json({message: "order deleted successfully"})

    } else{
        res.status(404).json({message:"Order Not Found"})
    }
    } catch (error) {
      console.error(error)  
        res.status(500).json({error:error.message})

    }
})
module.exports = router