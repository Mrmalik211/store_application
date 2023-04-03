require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');
const productsRoute = require('./routes/products.routes');
const db = require('./database/connet');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/products', productsRoute);

// Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  db();
  console.log('Server Is Runnign On Port 5000');
});
