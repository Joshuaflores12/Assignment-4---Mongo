const mongoose = require('mongoose');

// Define the Product schema

const productSchema = new mongoose.Schema({

  name: { type: String, required: true },

  price: { type: Number, required: true },

  description: { type: String },

  // Add other fields as necessary

});

// Register the model with Mongoose

const Product = mongoose.model('Product', productSchema);

module.exports = Product; // Export the model