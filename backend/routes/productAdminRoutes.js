const express = require("express")
const Product = require("../models/Product")
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router()
//route get /api/admin/product
//desc get all products
//admin only/private

router.get("/", protect , isAdmin, async(req, res)=>{
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "server Error", error:error.message})
    }
})
module.exports = router