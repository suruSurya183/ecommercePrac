import express, { Router } from "express";
import * as productController from "../controllers/product.controller.js"
const router = express.Router();

// Define route for creating a new category
router.post('/signup', productController.productInsert);


export default router;