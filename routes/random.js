var express = require('express');
var router = express.Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const result = await Product.aggregate([{ $sample: { size: 8 } }]);

    res.status(200).json(result);
  } catch (err) {
    console.log(er);
    res.status(500).send('server error');
  }
});

module.exports = router;
