const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');

const test = (req, res) => {
  res.json(`test is working`);
};

//register
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: 'email is required',
      });
    }
    //to check if email is taken
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: `email is already taken`,
      });
    }

    if (!password) {
      //also for the future || password.length < 6
      return res.json({
        error: 'password is required',
      });
    }

    const hashedPassword = await hashPassword(password);
    //create a user
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No user found',
      });
    }

    //check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      return res.json('password match');
    } else if (!match) {
      return res.json({
        error: 'passwords do not match',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
