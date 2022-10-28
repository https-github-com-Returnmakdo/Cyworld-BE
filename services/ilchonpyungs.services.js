const IlchonpyungsRepository = require('../repositories/ilchonpyungs.repositories');

class IlchonpyungsService {
  ilchonpyungsRepository = new IlchonpyungsRepository();
  createBest = async (req, res, next) => {
    const { ilchonpyung } = req.body;
    const { userId } = req.params;
    if (!ilchonpyung) throw new Error('일촌평을 작성해주세요.');
    if (ilchonpyung.length < 2)
      throw new Error('일촌평을 3자이상 입력해주세요.');

    await this.ilchonpyungsRepository.createBest(userId, ilchonpyung);
  };
}

module.exports = IlchonpyungsService;
