import { Router } from "express";

const router = Router();

// const products = [];

import { Product } from "../models/product.model.js";

router.get("/", async function (req, res) {
  const dbProducts = await Product.findAll();
  res.send(JSON.stringify(dbProducts));
});

router.delete("/", async (req, res) => {
  const { productId } = req.body;

  await Product.destroy({
    where: {
      customId: productId,
    },
  });

  res.send("Deleted product from database");
});

router.post("/", async function (req, res) {
  const { id, name, stars, reviews, sale, price } = req.body;

  await Product.create({
    customId: id,
    name,
    stars,
    reviews,
    sale,
    price,
  });
  res.send("Added product to the database");
});

export default router;
