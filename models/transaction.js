const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
  },
  shop_id: {
    type: String,
    required: true,
  },
  products: {
    type: Object,
  },
  total_price: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  type: {
    type: String,
    required: true,
  },
});

transactionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

transactionSchema.set("toJSON", {
  virtuals: true,
});

exports.Transaction = mongoose.model("Transaction", transactionSchema);
