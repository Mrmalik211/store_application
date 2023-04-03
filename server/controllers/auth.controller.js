const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../middlewares/error');

const signUp = async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    const findUsername = await User.findOne({name});
    if (findUsername) return next(createError(403, 'User Already Exist'));
    const findUserEmail = await User.findOne({email});
    if (findUserEmail) return next(createError(403, 'User Already Exist'));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({...req.body, password: hash});
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({name: req.body.name});
    if (!user) return next(createError(404, 'User Not Found!'));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(401, 'Name & Password Is Invalid!'));

    // JWT
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_SECREAT_KEY
    );

    const {password, ...others} = user._doc;

    return res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

// Logout
const logout = async (req, res, next) => {
  res.clearCookie('access_token').status(200).json('Logout Successfully');
};

module.exports = {
  signUp,
  signIn,
  logout,
};
