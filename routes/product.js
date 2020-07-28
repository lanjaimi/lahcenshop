const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './public/uploads/');
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      (new Date().toISOString() + file.originalname).replace(/\s+/g, '')
    );
  },
});
const Product = require('../models/Product');

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    callBack(null, true);
  } else {
    callBack(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('product not found');
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('server error');
  }
});

router.post('/', upload.array('uploadedImages', 10), async (req, res) => {
  try {
    const images = req.files.map((file) => {
      return file.path;
    });

    const newProduct = new Product({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      imagePaths: images,
    });

    await newProduct.save();

    res.status(200).json({ _id: newProduct._id });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
