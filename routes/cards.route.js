import express from "express";
const router = express.Router();
import * as cardsController from "../controllers/cards.controller.js"

// POST request to insert a new card
router.post('/signup', cardsController. insertCard);

// PUT request to update a card by ID
router.put('/update/:id',cardsController.updateCard);

// GET request to display a card
router.get('/show/:id',cardsController.showCards);

// GET request to display all card
router.get('/all',cardsController.showAllcard);

// DELETE request to display all card
router.delete('/delete/:id',cardsController. deleteCard);

export default router;