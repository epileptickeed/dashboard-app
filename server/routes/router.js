const express = require("express");
const router = express.Router();
const schemas = require("../modals/schemas");

router.post("/expenses", async (req, res) => {
  const { type, category, desc, sum } = req.body;

  const expensesData = { type: type, category: category, desc: desc, sum: sum };
  const newExpense = new schemas.Expenses(expensesData);
  const saveExpenses = await newExpense.save();
  if (saveExpenses) {
    res.send("Expense added");
  } else {
    res.send("failed something went wrong");
  }
  res.end();
});

router.get("/items", (req, res) => {
  const data = [
    {
      title: "hello",
    },
  ];

  res.send(data);
});

module.exports = router;
