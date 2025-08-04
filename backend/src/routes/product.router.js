const express = require('express');
const productModel = require('../models/product.model');
const ImageKit = require('imagekit');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

function getImageKit() {
  if (!process.env.PUBLIC_KEY || !process.env.PRIVATE_KEY || !process.env.URLENDPOINT) {
    throw new Error('ImageKit credentials are missing in environment variables.');
  }
  return new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URLENDPOINT,
  });
}

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message,
    });
  }
});

// ADD product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const imagekit = getImageKit();

    const { title, description, category, price } = req.body;
    if (!title || !description || !category || !price) {
      return res.status(400).json({ error: 'Missing required fields', body: req.body });
    }

    let imageUrl = '';
    if (req.file) {
      try {
        const result = await imagekit.upload({
          file: req.file.buffer,
          fileName: req.file.originalname,
          isPrivateFile: false,
          isPublished: true,
        });
        imageUrl = result.url;
      } catch (uploadErr) {
        console.error('ImageKit upload failed:', uploadErr);
        return res.status(502).json({ error: 'Image upload failed', details: uploadErr.message });
      }
    } else {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const product = new productModel({
      title,
      description,
      category,
      price: isNaN(Number(price)) ? price : Number(price),
      image: imageUrl,
    });

    await product.save();

    return res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json({ product });
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// UPDATE
router.post('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, category, price } = req.body;

    const updateData = {
      title,
      description,
      category,
      price: isNaN(Number(price)) ? price : Number(price),
    };

    if (req.file) {
      const imagekit = getImageKit();
      try {
        const result = await imagekit.upload({
          file: req.file.buffer,
          fileName: req.file.originalname,
          isPrivateFile: false,
          isPublished: true,
        });
        updateData.image = result.url;
      } catch (uploadErr) {
        console.error('ImageKit upload failed on update:', uploadErr);
        // continue without replacing image, or return error depending on your business logic
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// DELETE
router.get('/delete/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
