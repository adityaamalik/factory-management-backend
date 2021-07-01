const { Transaction } = require("../models/transaction");
const express = require("express");

const router = express.Router();

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.userID !== "admin") {
    if (req.query.type && req.query.userID) {
      filter = { type: req.query.type, employee_id: req.query.userID };
    }
  } else {
    if (req.query.type) {
      filter = { type: req.query.type };
    }
  }

  const transactionList = await Transaction.find(filter).sort({ date: -1 });

  if (!transactionList) {
    res.status(500).json({ success: false });
  }
  res.send(transactionList);
});

router.get(`/:id`, async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(500).json({ success: false });
  }
  res.send(transaction);
});

router.post("/", async (req, res) => {
  let transaction = new Transaction({
    employee_id: req.body.employee_id,
    employee_name: req.body.employee_name,
    shop_id: req.body.shop_id,
    products: req.body.products,
    total_price: req.body.total_price,
    type: req.body.type,
  });

  transaction = await transaction.save();

  if (!transaction)
    return res.status(500).send("The transaction cannot be created");

  res.send(transaction);
});

router.put("/:id", async (req, res) => {
  let params = {
    employee_id: req.body.employee_id,
    employee_name: req.body.employee_name,
    shop_id: req.body.shop_id,
    products: req.body.products,
    total_price: req.body.total_price,
    type: req.body.type,
  };

  for (let prop in params) if (!params[prop]) delete params[prop];

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    params,
    {
      new: true,
    }
  );

  if (!transaction)
    return res.status(500).send("the transaction cannot be updated!");
  res.send(transaction);
});

router.delete("/:id", (req, res) => {
  Transaction.findByIdAndRemove(req.params.id)
    .then((transaction) => {
      if (transaction) {
        return res
          .status(200)
          .json({ success: true, message: "the transaction is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "transaction not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
