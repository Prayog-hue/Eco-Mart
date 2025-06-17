// const express = require("express");
// const Checkout = require("../models/Checkout");
// const Product = require("../models/Product");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");

// const router = express.Router()


// const { protect, isAdmin } = require("../middleware/authMiddleware");


// //@route POST /api/checkout
// //@desc Create a new checkout session
// //@access Private
// router.post("/", protect, async (req, res) => {
//     const { checkoutItems, totalPrice, paymentMethod, shippingAddress } = req.body;

//     try {
//         if (!checkoutItems || checkoutItems.length === 0) {
//             return res.status(400).json({ message: "No items to checkout" });
//         }

//         // Create a new checkout session
//         const newCheckout = await Checkout.create({
//             user: req.user._id,
//             checkoutItems,
//             shippingAddress,
//             paymentMethod,
//             totalPrice,
//             paymentStatus: "Pending",
//             isPaid: false,
//         });
//         console.log(`checkout created for user:${req.user._id}`);
//         res.status(201).json(newCheckout);
//     } catch (error) {
//         console.error("Checkout error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// //@route PUT /api/checkout/:id/pay
// //@desc Update to mark as paid after successful payment
// //@access Private
// router.put("/:id/pay", protect, async (req, res) => {
//     const { paymentStatus, paymentDetails } = req.body
//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" });
//         }

//         if (paymentStatus === "paid") {

//             checkout.isPaid = true;
//             checkout.paymentStatus = paymentStatus;
//             checkout.paymentDetails = paymentDetails;
//             checkout.paidAt = Date.now();
//             await checkout.save();
//             res.status(200).json(checkout);
//         } else {
//             res.status(400).json({ message: "Invalid Payment Status" })
//         }

//     } catch (error) {
//         console.error("Payment update error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// //@route POST /api/checkout/:id/finalize
// //@desc Finalize checkout and convert to an order after payment confirmation
// //@access Private
// router.post("/:id/finalize", protect, async (req, res) => {
//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" });
//         }

//         if (checkout.isPaid && !checkout.isFinalized) {
//             //create final order based on checkout details
//             const finalOrder = await Order.create({
//                 user: checkout.user,
//                 orderItems: checkout.checkoutItems,
//                 shippingAddress: checkout.shippingaddress,
//                 paymentMethod: checkout.paymentMethod,
//                 totalPrice: checkout.totalPrice,
//                 isPaid: true,
//                 paidAt: checkout.paidAt,
//                 isDelivered: false,
//                 paymentStatus: "paid",
//                 paymentDetails: checkout.paymentDetails,
//             });

//             //Mark the checkout as finalized
//             checkout.isFinalized = true;
//             checkout.finalizedAt = Date.now();
//             await checkout.save();
//             // delete cart after finalizing
//             await Cart.findOneAndDelete({ user: checkout.user });
//             res.status(201).json(finalOrder);
//         } else if (checkout.isFinalized) {
//             res.status(400).json({ message: "checkout already finalized" });
//         } else {
//             res.status(400).json({ message: "Checkout is not paid" });
//         }
//     } catch (error) {
//         console.error("Finalize error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// });


// module.exports = router;

const express = require("express");
const Checkout = require("../models/Checkout");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, totalPrice, paymentMethod, shippingAddress } = req.body;

    try {
        if (!checkoutItems || checkoutItems.length === 0) {
            return res.status(400).json({ message: "No items to checkout" });
        }

        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Checkout error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error("Payment update error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Delete cart after finalizing
            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error("Finalize error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
