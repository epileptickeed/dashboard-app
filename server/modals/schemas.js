const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now },
});

const addExpenseSchema = new Schema({
  type: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  sum: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", userSchema, "users");
const Expenses = mongoose.model("Expenses", addExpenseSchema, "expenses_form");

const mySchemas = { Users: Users, Expenses: Expenses };

module.exports = mySchemas;

//continue https://www.youtube.com/watch?v=HGgyd1bYWsE - 4:49
