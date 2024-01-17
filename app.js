const express = require('express');
const app = express();
const unhandledError = require('./utils/ErrorHandler');
const mongoose = require('mongoose');


app.use(express.json());

// Product Routes
// const productRoutes = require('./routes/productRoutes');
// app.use('/api/v1', productRoutes);

// Category Routes
// const categoryRoutes = require('./routes/categoryRoutes');
// app.use('/api/v1', categoryRoutes);

// UserRoutes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/v1', userRoutes);

const user = require('./controller/userController');
app.use("/api/v1/user", user);




module.exports = app;