const { Guestbooks } = require('../models');

class GuestBooksRepository {
  constructor() {
    this.Guestbooks = Guestbooks;
  }

  createBook = async (book) => {
    return await this.Guestbooks.create(book);
  };

  getBooks = async (userId) => {
    return await this.Guestbooks.findAll({
      where: { userId },
      order: [['guestbookId', 'desc']],
    });
  };

  findByGuestBook = async (guestbookId) => {
    return await this.Guestbooks.findByPk(guestbookId);
  };

  updateBook = async (guestbook, guestbookId) => {
    await this.Guestbooks.update(
      { guestBook: guestbook },
      { where: { guestbookId } }
    );
  };

  deleteBook = async (guestbookId) => {
    await this.Guestbooks.destroy({
      where: { guestbookId },
    });
  };
}

module.exports = GuestBooksRepository;
