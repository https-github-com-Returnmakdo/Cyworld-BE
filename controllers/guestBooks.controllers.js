const GuestBooksService = require('../services/guestBooks.services');

class GuestBooksController {
  guestBooksService = new GuestBooksService();

  createBook = async (req, res, next) => {
    try {
      const result = await this.guestBooksService.createBook(req, res);
      res.status(200).send({ data: result });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  getBooks = async (req, res, next) => {
    try {
      const result = await this.guestBooksService.getBooks(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  updateBook = async (req, res, next) => {
    try {
      await this.guestBooksService.updateBook(req, res);
      res.status(200).send({ msg: '방명록이 수정되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      await this.guestBooksService.deleteBook(req, res);
      res.status(200).send({ msg: '방명록이 삭제되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = GuestBooksController;
