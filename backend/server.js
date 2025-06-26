const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // MongoDB connection
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoute = require("./routes/subscribeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/productAdminRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")

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
app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/upload", uploadRoutes); // Upload routes
app.use("/api", subscribeRoute); // Subscribe routes
app.use("/api/admin/users", adminRoutes); // admin routes
app.use("/api/admin/products", productAdminRoutes); // admin  product routes
app.use("/api/admin/orders", adminOrderRoutes); // admin order routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

