const IlchonpyungsService = require('../services/ilchonpyungs.services');

class IlchonpyungsController {
  ilchonpyungsService = new IlchonpyungsService();

  createBest = async (req, res, next) => {
    try {
      await this.ilchonpyungsService.createBest(req, res);
      res.status(200);
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = IlchonpyungsController;
