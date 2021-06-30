const { Product } = require("../models/product");
const express = require("express");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post("/", async (req, res) => {
  const imgURI =
    req.body.image.replace("dropbox", "dl.dropboxusercontent") ||
    req.body.image;

  let product = new Product({
    name: req.body.name,
    image: imgURI,
    price: req.body.price,
    stock: req.body.stock,
    unit: req.body.unit,
    size: req.body.size,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});

router.put("/:id", async (req, res) => {
  let imgURI = req.body.image;

  if (imgURI.includes("dropbox") && !imgURI.includes("dl.dropboxusercontent")) {
    imgURI = req.body.image.replace("dropbox", "dl.dropboxusercontent");
  }

  let params = {
    name: req.body.name,
    image: imgURI,
    price: req.body.price,
    stock: req.body.stock,
    unit: req.body.unit,
    size: req.body.size,
  };

  for (let prop in params) if (!params[prop]) delete params[prop];

  const product = await Product.findByIdAndUpdate(req.params.id, params, {
    new: true,
  });

  if (!product) return res.status(500).send("the product cannot be updated!");
  res.send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
