const express = require("express");
const productModel = require("../models/product.model");
const ImageKit = require("imagekit");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Helper to initialize ImageKit
function getImageKit() {
  if (!process.env.PUBLIC_KEY || !process.env.PRIVATE_KEY || !process.env.URLENDPOINT) {
    throw new Error("ImageKit credentials are missing in environment variables.");
  }
  return new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URLENDPOINT,
  });
}

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add new product
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const imagekit = getImageKit();

    let imageUrl = "";
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        isPrivateFile: false,
        isPublished: true,
      });
      imageUrl = result.url;
    }

    const { title, description, category, price } = req.body;
    if (!title || !description || !category || !price) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    const product = new productModel({
      title,
      description,
      category,
      price,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update product
router.post("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, category, price } = req.body;

    const updateData = { title, description, category, price };

    if (req.file) {
      const imagekit = getImageKit();
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        isPrivateFile: false,
        isPublished: true,
      });
      updateData.image = result.url;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// Delete product
router.get("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
