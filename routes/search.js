var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

router.get('/:query', async (req, res) => {
  try {
    const serachTerm = req.query.query.replace(/[^A-Za-z0-9 -]/g, '');

    await Product.find(
      {
        title: { $regex: serachTerm, $options: 'i' },
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
