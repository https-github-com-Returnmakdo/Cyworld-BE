const { GuestBooks } = require('../models');

class GuestBooksRepository {
  constructor() {
    this.GuestBooks = GuestBooks;
  }
}

module.exports = GuestBooksRepository;
