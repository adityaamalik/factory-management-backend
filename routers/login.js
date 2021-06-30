const { Employee } = require("../models/employee");
const express = require("express");

const router = express.Router();

router.get(`/:passcode`, async (req, res) => {
  const employee = await Employee.find({ passcode: req.params.passcode });

  if (!employee) {
    res.status(500).json({ success: false });
  }
  res.send(employee);
});

module.exports = router;
