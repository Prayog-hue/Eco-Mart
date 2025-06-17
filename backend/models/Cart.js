const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: String,
        image: [
            {
              url: String,
              altText: String
            }
          ],
        price: Number, // Changed from String
        size: String,
        color: String,
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Changed from user
        guestId: { type: String },
        products: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);