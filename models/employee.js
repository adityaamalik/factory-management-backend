const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

employeeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

employeeSchema.set("toJSON", {
  virtuals: true,
});

exports.Employee = mongoose.model("Employee", employeeSchema);
