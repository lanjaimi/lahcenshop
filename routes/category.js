var express = require('express');
var router = express.Router();

const Product = require('../models/Product');

router.get('/:category', async (req, res) => {
  try {
    await Product.find({ category: req.params.category }, (err, data) => {
      if (err) {
        console.log(err);
      }

      if (data) {
        let catName = req.params.category;

        res.status(200).json({ data, catName });
      }
    });
  } catch (err) {
    console.log(er);
    res.status(500).send('server error');
  }
});

module.exports = router;
