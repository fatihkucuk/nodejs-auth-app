const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');

dotenv.config({ path: './config.env' });

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to DB')
);

//Add Middlewares
app.use(express.json());

//Add Route Middlewares
app.use('/api/v1/users', authRoute);

module.exports = app;
