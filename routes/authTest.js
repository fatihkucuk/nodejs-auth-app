const router = require('express').Router();
const { protectRoute, restrictTo } = require('../controllers/authController');
const { USER_ROLES } = require('../constants');

router.get(
  '/',
  protectRoute,
  restrictTo(USER_ROLES.ADMIN, USER_ROLES.USER),
  (req, res) => {
    res.send('OK');
  }
);

module.exports = router;
