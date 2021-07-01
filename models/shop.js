const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  map_location: {
    type: String,
  },
  area: {
    type: String,
    required: true,
  },
  pin_code: {
    type: Number,
    required: true,
  },
  phone_number_1: {
    type: Number,
    required: true,
  },
  phone_number_2: {
    type: Number,
  },
  owner_name: {
    type: String,
    required: true,
  },
  number_of_fridge: {
    type: Number,
  },
  qr_code: {
    type: String,
    required: true,
  },
  shop_code: {
    type: String,
    required: true,
  },
});

shopSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

shopSchema.set("toJSON", {
  virtuals: true,
});

exports.Shop = mongoose.model("Shop", shopSchema);
