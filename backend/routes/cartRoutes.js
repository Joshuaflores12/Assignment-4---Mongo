const express = require('express');
const CartItem = require('../models/cartModel');
const Product = require('../models/productModel'); // Ensure the Product model is imported

const router = express.Router();

// Get Cart
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('productId');
    
    // Filter out cart items where the associated product is missing (null)
    const validCartItems = cartItems.filter(item => item.productId !== null);

    res.json(validCartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove from Cart
router.post('/remove', async (req, res) => {
  const { productId } = req.body;

  try {
    const result = await CartItem.deleteOne({ productId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    const cartItems = await CartItem.find().populate('productId');
    const validCartItems = cartItems.filter(item => item.productId !== null);

    res.json(validCartItems);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add to Cart
router.post('/add', async (req, res) => {
  const { productId } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart item already exists
    const existingItem = await CartItem.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
    } else {
      const newCartItem = new CartItem({ productId });
      await newCartItem.save();
    }

    // Return updated cart
    const cartItems = await CartItem.find().populate('productId');
    const validCartItems = cartItems.filter(item => item.productId !== null);

    res.json(validCartItems);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
