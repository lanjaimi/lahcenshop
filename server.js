const express = require('express');
const app = express();
const helmet = require('helmet');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const searchRouter = require('./routes/search');
const latestRouter = require('./routes/latest');
const randomRouter = require('./routes/random');
const mongoose = require('mongoose');
const path = require('path');

/// bucketeer config

process.env.AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = 'us-east-1';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/market_place';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', (_) => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

app.use(helmet());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use('/public/uploads', express.static('public/uploads'));
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/search', searchRouter);
app.use('/api/latest', latestRouter);
app.use('/api/random', randomRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
