const router = require('express').Router();
const { protectRoute, restrictTo } = require('../controllers/authController');
const { USER_ROLES } = require('../constants');

router.get(
  '/',
  protectRoute,
  restrictTo(USER_ROLES.admin, USER_ROLES.user),
  (req, res) => {
    res.send('OK');
  }
);

module.exports = router;
