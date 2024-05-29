const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
  registerUser,
  loginUser,
  addExpenses,
  deleteExpense,
  getProfile,
} = require('../controllers/authController');

router.use(
  cors({
    credentials: true,
    origin: `http://localhost:5173`,
  }),
);

router.post('/register', registerUser);
router.post('/', loginUser);
router.get('/profile', getProfile);
router.post('/expenses', addExpenses);
router.post('/deleteExpense', deleteExpense);

module.exports = router;
