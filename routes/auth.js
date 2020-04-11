const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', async (req, res) => {
  authController.register(req, res);
});

router.post('/login', async (req, res) => {
  authController.login(req, res);
});

module.exports = router;
