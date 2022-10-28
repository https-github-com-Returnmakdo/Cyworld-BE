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
}

module.exports = GuestBooksController;
