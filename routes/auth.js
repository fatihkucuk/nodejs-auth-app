const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', async (req, res, next) => {
  authController.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
  authController.login(req, res, next);
});

module.exports = router;
