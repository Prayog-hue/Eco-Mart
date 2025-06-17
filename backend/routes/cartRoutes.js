const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route   POST /api/cart
// @desc    Add a product to a cart for a guest or a specific user by userId
// @access  Public
router.post("/", async (req, res) => {
    let { userId, productId, quantity, size, color, guestId } = req.body;

    try {
      

        // Find product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

       

        //Determine if the user is logged or guest
        let cart = await getCart(userId, guestId);

        if (cart) {
            // Update existing cart
            const productIndex = cart.products.findIndex(
                (p) =>
                 
                    p.productId.toString() === productId &&
                    (!p.size || !size || p.size.toLowerCase() === size.toLowerCase()) &&
                    (!p.color || !color || p.color.toLowerCase() === color.toLowerCase())
            );

            if (productIndex > -1) {
                // Update quantity
                
                cart.products[productIndex].quantity += Number(quantity);

            } else {
                // Add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images , 
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart)
              
            
        } else {
            // Create new cart
            const newCart = await Cart.create({
                userId: userId ? userId : undefined,
                guestId: guestId ? guestId: "guest_"+ new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images,
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],
                totalPrice: product.price* quantity
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid cart data", errors: error.errors });
        }
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route   PUT /api/cart
// @desc    Update product quantity in the cart for a guest or user
// @access  Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        // Find cart
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find product in cart
        const productIndex = cart.products.findIndex(
            (p) =>
               
                p.productId.toString() === productId &&
                (!p.size || !size || p.size.toLowerCase() === size.toLowerCase()) &&
                (!p.color || !color || p.color.toLowerCase() === color.toLowerCase())
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                // Update quantity
                cart.products[productIndex].quantity = quantity;
            } else {
                // Remove product if quantity is 0
                cart.products.splice(productIndex, 1);
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route   DELETE /api/cart
// @desc    Remove a product from the cart
// @access  Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
               
                p.productId.toString() === productId &&
                (!p.size || !size || p.size.toLowerCase() === size.toLowerCase()) &&
                (!p.color || !color || p.color.toLowerCase() === color.toLowerCase())
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in the cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /api/cart
// @desc    Get cart of the user (logged in or guest)
// @access  Public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            return res.json(cart);
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});


// //@route POST /api/cart/merge
// //@desc merge guest cart into user cart on login
// //@access Private
// router.post("/merge", protect, async(req, res) => {
//     const { guestId } = req.body;

//     try {
//         //find the guest cart and the user cart
//         const guestCart = await Cart.findOne({ guestId });
//         // const userCart = await Cart.findOne({ user: req.user._id });
//         const userCart = await Cart.findOne({ user: req.user._id });


//         if (guestCart) {
//             if (guestCart.products.length === 0) {
//                 return res.status(400).json({ message: "Guest Cart is empty" });
//             }
//             if (userCart) {
//                 //merge guest cart into user cart
//                 guestCart.products.forEach((guestItem) => {
//                     const productIndex = userCart.products.findIndex((item) =>
//                         item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color
//                     );

//                     if (productIndex > -1) {
//                         //if the items exist in the user cart update the quantity
//                         userCart.products[productIndex].quantity += guestItem.quantity;
//                     } else {
//                         //otherwise add the guest item to the cart
//                         userCart.products.push(guestItem);
//                     }
//                 });

//                 userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//                 await userCart.save();

//                 //remove the guest cart after merging
//                 try {
//                     await Cart.findOneAndDelete({ guestId });
//                 } catch (error) {
//                     console.error("Error deleting guest cart", error);
//                 }
//                 res.status(200).json(userCart);
//             } else {
//                 // if the user has no existing cart assign the guest cart to the user
//                 guestCart.user = req.user._id;
//                 guestCart.guestId = undefined;

//                 await guestCart.save();

//                 res.status(200).json(guestCart);
//             }
//         } else {
//             if (userCart) {
//                 //guest cart has already been merged, return user cart
//                 return res.status(200).json(userCart);
//             }
//             res.status(404).json({ message: "Guest cart not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server Error" });
//     }
// });


module.exports = router;