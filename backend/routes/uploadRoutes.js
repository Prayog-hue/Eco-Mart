const express = require("express");
const { memoryStorage } = require("multer");
const multer = require("multer"); // Fixed typo
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage
const storage = multer.memoryStorage(); // Fixed to use memoryStorage function
const upload = multer({ storage });

// Initialize Express router
const router = express.Router();

// Route for uploading a single image
router.post("/", upload.single("image"), async (req, res) => {
    console.log("Request file:", req.file); // Debug log
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No files found" }); // Fixed error response
        }

        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "ecomart" }, // Optional: specify a folder in Cloudinary
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(stream); // Pipe buffer to stream
            });
        };

        // Upload the file to Cloudinary
        const result = await streamUpload(req.file.buffer);
        res.status(200).json({ message: "File uploaded successfully", url: result.secure_url });
    } catch (error) {
        console.error("Upload error:", error); // Log the error for debugging
        res.status(500).json({ message: "Error uploading file", error: error.message });
    }
});

module.exports = router; // Export the router for use in the main app