const mongoose = require('mongoose');

// Import the Product model

const Product = require('./productModel'); // Adjust the path based on your project structure

// Define the CartItem schema

const cartItemSchema = new mongoose.Schema({

  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model

  quantity: { type: Number, default: 1 }

});

// Register the CartItem model

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem; // Export the model