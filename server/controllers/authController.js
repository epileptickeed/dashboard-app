const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
require('dotenv/config');

const test = (req, res) => {
  res.json(`test is working`);
};

//register
const registerUser = async (req, res) => {
  try {
    const { email, password, expenses } = req.body;

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
      expenses,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password, expenses } = req.body;
    console.log(req.sessionID);
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
      req.session.authenticated = true;
      req.session.user = {
        email,
        password,
      };
      return res.json('password match');
    }
    if (!match) {
      return res.json({
        error: 'passwords do not match',
      });
    }

    //check user expenses
    const activites = await User.find({ expenses });
    if (activites) {
      return res.json(activites);
    }
  } catch (error) {
    console.error(error);
  }
};

const addExpenses = async (req, res) => {
  try {
    const { type, desc, sum, category, id, date } = req.body;
    const userEmail = req.session.user.email;
    const userId = req.session.user._id; // не работает через id, po4emu??!?
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newExpense = {
      type: type,
      desc: desc,
      sum: sum,
      category: category,
      id: id,
      date: date,
    };

    user.expenses.push(newExpense);

    await user.save();

    res.status(201).json({ message: 'expense added', user: user });
  } catch (error) {
    console.error(error);
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.body;
  try {
    const userEmail = req.session.user.email;
    const user = await User.findOne({ email: userEmail });
    user.expenses = user.expenses.filter((item) => item.id !== id);
    await user.save();
    res.send('expense deleted');
  } catch (error) {
    console.error(error);
  }
};

const getProfile = async (req, res) => {
  if (req.session.authenticated) {
    const user = req.session.user;
    if (user) {
      const fullUser = await User.findOne({ email: user.email });
      res.json(fullUser);
    }
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  addExpenses,
  deleteExpense,
  getProfile,
};
