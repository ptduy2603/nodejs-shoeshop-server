const authRouter = require("./auth");
const productRouter = require("./product");
const paymentRouter = require("./payment");
const countryRouter = require("./country");
const cartRouter = require("./cart");
const categoriesRouter = require("./categories");

const route = (app) => {
  app.use("/users", authRouter);
  app.use("/products", productRouter);
  app.use("/country", countryRouter);
  app.use("/payments", paymentRouter);
  app.use("/cart", cartRouter);
  app.use("/categories", categoriesRouter);
};

module.exports = route;
