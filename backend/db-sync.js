import { sequelize } from "./db.js";

import { Product } from "./models/product.model.js";

// alter: true - update fara drop
// force: true - update cu drop
sequelize.sync({ force: true }).then(() => {
  console.log("FINISHED SUCCESS");
  process.exit(0);
});
