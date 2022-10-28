const { Ilchonpyungs } = require('../models');

class IlchonpyungsRepository {
  constructor() {
    this.Ilchonpyungs = Ilchonpyungs;
  }
  createBest = async (userId, ilchonpyung) => {
    await this.Ilchonpyungs.create(userId, ilchonpyung);
  };
}

module.exports = IlchonpyungsRepository;
