const router = require('express').Router();
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.send('OK');
});

module.exports = router;
