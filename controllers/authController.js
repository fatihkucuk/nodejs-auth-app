const { User, validateRegistration, validateLogin } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email is already exist');

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
  next();
};

const login = async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password is wrong!');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send('Email or password is wrong!');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );
  res.header(process.env.TOKEN_HEADER_KEY, token).send(token);
  next();
};

const protectRoute = (req, res, next) => {
  const token = req.header(process.env.TOKEN_HEADER_KEY);
  if (!token) return res.status(401).send('Access denied!');

  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser) return res.status(400).send('Invalid token!');

    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(400).send('Invalid token!');
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('You do not have permission');
    }
    next();
  };
};

module.exports.register = register;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.restrictTo = restrictTo;
