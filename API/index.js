const express = require("express");
const { PrismaClient } = require('@prisma/client');

// Imported routes
const userRouter = require("./Routes/user");
const productRouter = require("./Routes/product");
const addressRouter = require("./Routes/address");
const cartRouter = require("./Routes/cart");
const collectionRouter = require("./Routes/collection");
const orderRouter = require("./Routes/order");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);
app.use("/collection", collectionRouter);
app.use("/order", orderRouter);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)