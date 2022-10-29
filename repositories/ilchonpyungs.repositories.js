const { Ilchonpyungs, Users } = require('../models');

class IlchonpyungsRepository {
  constructor() {
    this.Ilchonpyungs = Ilchonpyungs;
    this.Users = Users;
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

  deleteBest = async (userId, ilchonId) => {
    return this.Ilchonpyungs.destroy({
      where: { userId, ilchonId },
    });
  };

  findByUser = async (userId) => {
    return this.Users.findByPk(userId);
  };
}

module.exports = IlchonpyungsRepository;
