import express from 'express';
import * as categoryController from '../controllers/category.controller.js'

const router = express.Router();

// Define route for creating a new category
router.post('/signup', categoryController.categoryInsert);

// Define route for updating a category
router.put('/update/:id', categoryController.categoryUpdate);

// Define route for updating a category
router.delete('/delete/:id', categoryController.categorieDelete);

// Define route for showing all categories
router.get('/all', categoryController.showAllcategory);

// Define route for showing a specific category
router.get('/show/:id', categoryController.showCategory);

export default router;
