const express = require('express');
const router = express.Router();
const GuestBooksController = require('../controllers/guestBooks.controllers');
const guestBooksController = new GuestBooksController();

router
  .route('/:userId/:guestbookId')
  .put(guestBooksController.updateBook)
  .delete(guestBooksController.deleteBook);

router
  .route('/:userId')
  .post(guestBooksController.createBook)
  .get(guestBooksController.getBooks);

module.exports = router;
