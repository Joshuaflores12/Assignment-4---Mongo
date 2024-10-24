const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

// Routes

app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);

// MongoDB Connection

mongoose.connect('mongodb://localhost:27017/coffee-store', {

  useNewUrlParser: true,

  useUnifiedTopology: true,

}).then(() => {

  console.log('Connected to MongoDB');

  app.listen(5000, () => {

    console.log('Server running on port 5000');

  });

}).catch(err => console.log(err));