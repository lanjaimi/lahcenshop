var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

router.get('/search', async (req, res) => {
  try {
    await Product.find(
      {
        title: { $regex: req.query.q, $options: 'i' },
      },
      (err, result) => {
        if (err) console.log(err);

        if (result) {
          res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});

module.exports = router;
