import { fileURLToPath } from "url";
import { dirname } from "path";
import createError from "http-errors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import logger from "morgan";
import mongoose from "mongoose";

dotenv.config();

import indexRouter from "./routes/index.js"; // Corrected import path
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import paymentRouter from "./routes/payment.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import refundRouter from "./routes/refund.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import cardsRouter from "./routes/cards.route.js"
// Get the directory name using fileURLToPath and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// using routes
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/payment", paymentRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/refund", refundRouter);
app.use("/feedback", feedbackRouter);
app.use("/cards", cardsRouter);

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
