const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // MongoDB connection
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();

dotenv.config(); // Load environment variables

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to ecomart");
});

// API routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/cart", cartRoutes); // Cart routes
app.use("/api/checkout", checkoutRoutes); // Checkout routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

