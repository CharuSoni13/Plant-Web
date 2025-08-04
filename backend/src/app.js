const express = require("express");
const productRouter = require("./routes/product.router");
const indexRouter = require("./routes/index.router");
const userRouter = require("./routes/user.router");
const app = express();
const path = require("path");
const morgon = require("morgan");
const cors = require("cors");

require("dotenv").config();
app.use(morgon("dev"));

app.use(cors({ origin: ["https://plant-web-frontend.onrender.com", "http://localhost:5174"] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.MONGODB_URI);

app.use("/", indexRouter);
app.use("/api/auth", userRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

module.exports = app;
