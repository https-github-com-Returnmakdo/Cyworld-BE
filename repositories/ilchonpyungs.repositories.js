const { Ilchonpyungs } = require('../models');

class IlchonpyungsRepository {
  constructor() {
    this.Ilchonpyungs = Ilchonpyungs;
  }
  createBest = async (best) => {
    return await this.Ilchonpyungs.create(best);
  };

  getBests = async (userId) => {
    return await this.Ilchonpyungs.findAll({
      where: { userId },
      order: [['ilchonId', 'desc']],
    });
  };

  findByBest = async (ilchonId) => {
    return this.Ilchonpyungs.findByPk(ilchonId);
  };

  deleteBest = async ( userId, ilchonId ) => {
    return this.Ilchonpyungs.destroy({
      where: { userId, ilchonId  },
    });
  };
}

module.exports = IlchonpyungsRepository;
