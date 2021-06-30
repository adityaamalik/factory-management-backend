const { Employee } = require("../models/employee");
const express = require("express");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const employeeList = await Employee.find().sort({ date: -1 });

  if (!employeeList) {
    res.status(500).json({ success: false });
  }
  res.send(employeeList);
});

router.get(`/:id`, async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(500).json({ success: false });
  }
  res.send(employee);
});

router.post("/", async (req, res) => {
  let employee = new Employee({
    name: req.body.name,
    phone_number: req.body.phone_number,
    passcode: req.body.passcode,
    date: new Date(),
  });

  employee = await employee.save();

  if (!employee) return res.status(500).send("The employee cannot be created");

  res.send(employee);
});

router.put("/:id", async (req, res) => {
  let params = {
    name: req.body.name,
    phone_number: req.body.phone_number,
  };

  for (let prop in params) if (!params[prop]) delete params[prop];

  const employee = await Employee.findByIdAndUpdate(req.params.id, params, {
    new: true,
  });

  if (!employee) return res.status(500).send("the employee cannot be updated!");
  res.send(employee);
});

router.delete("/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id)
    .then((employee) => {
      if (employee) {
        return res
          .status(200)
          .json({ success: true, message: "the employee is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "employee not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
