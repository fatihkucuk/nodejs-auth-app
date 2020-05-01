const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const authTestRoute = require('./routes/authTest');

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
app.use('/api/v1/auth-test', authTestRoute);

const port = process.env.PORT || '3000';
app.listen(port, () => console.log('Server Works'));
