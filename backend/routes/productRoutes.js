const express = require("express");
const Product = require("../models/Product");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", protect, isAdmin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            metaTitle,
            metaDescription,
            metaKeywords,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            metaTitle,
            metaDescription,
            metaKeywords,
            user: req.user._id, // Reference to the admin who created it
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   PUT /api/products/:id
// @desc    Update an existing product
// @access  Private/Admin
router.put("/:id", protect, isAdmin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            metaTitle,
            metaDescription,
            metaKeywords,
        } = req.body;

        // Find product by ID
        const product = await Product.findById(req.params.id);

        if (product) {
            // Update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price !== undefined ? price : product.price;
            product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
            product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight !== undefined ? weight : product.weight;
            product.sku = sku || product.sku;
            product.metaTitle = metaTitle || product.metaTitle;
            product.metaDescription = metaDescription || product.metaDescription;
            product.metaKeywords = metaKeywords || product.metaKeywords;

            // Save the updated product
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private/Admin
router.delete("/:id", protect, isAdmin, async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);
        if (product) {
            // Remove from the DB
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /api/products
// @desc    Get all products with optional query filters
// @access  Public
router.get("/", async (req, res) => {
    try {
        console.log("Received GET /api/products request:", req.query);
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit = 10,
        } = req.query;

        let query = {};

        // Filter logic
        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection;
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") };
        }
        if (color) {
            query.colors = { $in: color.split(",") };
        }
        if (gender && gender.toLowerCase() !== "all") {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Sorting
        let sort = {};
        switch (sortBy) {
            case "PriceAsc":
                sort.price = 1;
                break;
            case "PriceDesc":
                sort.price = -1;
                break;
            case "Featured":
                sort.isFeatured = -1; // Sort by isFeatured (true first)
                break;
            default:
                sort.createdAt = -1; // Default: newest first
                break;
        }

        // Execute query
        const products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit));

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
//@route GET /api/products/best-seller
//@desc  Retrive  the product with the highest rating
//@access Public
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.status(200).json(bestSeller);
        } else {
            res.status(404).json({ message: "No best seller found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route   GET /api/products/new-arrivals
// @desc    Retrieve the latest 8 products by creation date
// @access  Public
router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        if (newArrivals.length > 0) {
            res.status(200).json(newArrivals);
        } else {
            res.status(404).json({ message: "No new arrivals found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


//@route GET api/products/:id
//@desc Get a single product by ID
//@access Public
router.get("/:id", async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            res.json(product)
        } else{
            res.status(404).json({message: "Product Not Found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

//@route GET /api/products/similar/:id
//@desc Get a similar products based on gender and category
//@access Public

router.get("/similar/:id", async(req,res)=>{
    const{id} = req.params
    
    try {
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({message: "Product Not Found"})
        }

        const similarProducts =  await Product.find({
            _id: {$ne: id}, // exclude the current product id
            gender: product.gender,
            category: product.category
        }).limit(4)

        res.json(similarProducts)

    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
        
    }
    
})



module.exports = router;