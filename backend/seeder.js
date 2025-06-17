const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        console.log("Existing products and users deleted");

        // Create a default admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123456", salt);
        const createdUser = await User.create({
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
        });
        console.log("Admin user created:", createdUser.email);

        // Validate products data
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("No products found in ./data/products");
        }

        // Assign the default user ID to each product
        const userID = createdUser._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: userID }; // Use 'user' to match schema
        });

        // Insert the products into the DB
        await Product.insertMany(sampleProducts);
        console.log("Products data seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding the data:", error.message);
        process.exit(1);
    }
};

// Run the seeder
seedData();