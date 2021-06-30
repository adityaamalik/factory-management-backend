const { Shop } = require("../models/shop");
const express = require("express");

const router = express.Router();

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.shop_code) {
    filter = { shop_code: req.query.shop_code };
  }
  const shopList = await Shop.find(filter);

  if (!shopList) {
    res.status(500).json({ success: false });
  }
  res.send(shopList);
});

router.get(`/:id`, async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    res.status(500).json({ success: false });
  }
  res.send(shop);
});

router.post("/", async (req, res) => {
  let shop = new Shop({
    name: req.body.name,
    address: req.body.address,
    area: req.body.area,
    pin_code: req.body.pin_code,
    phone_number_1: req.body.phone_number_1,
    phone_number_2: req.body.phone_number_2,
    owner_name: req.body.owner_name,
    number_of_fridge: req.body.number_of_fridge,
    shop_code: req.body.shop_code,
    qr_code: req.body.qr_code,
  });

  shop = await shop.save();

  if (!shop) return res.status(500).send("The shop cannot be created");

  res.send(shop);
});

router.put("/:id", async (req, res) => {
  let params = {
    name: req.body.name,
    address: req.body.address,
    area: req.body.area,
    pin_code: req.body.pin_code,
    phone_number_1: req.body.phone_number_1,
    phone_number_2: req.body.phone_number_2,
    owner_name: req.body.owner_name,
    number_of_fridge: req.body.number_of_fridge,
  };

  for (let prop in params) if (!params[prop]) delete params[prop];

  const shop = await Shop.findByIdAndUpdate(req.params.id, params, {
    new: true,
  });

  if (!shop) return res.status(500).send("the shop cannot be updated!");
  res.send(shop);
});

router.delete("/:id", (req, res) => {
  Shop.findByIdAndRemove(req.params.id)
    .then((shop) => {
      if (shop) {
        return res
          .status(200)
          .json({ success: true, message: "the shop is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "shop not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
