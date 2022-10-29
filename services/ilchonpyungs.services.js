const IlchonpyungsRepository = require('../repositories/ilchonpyungs.repositories');

class IlchonpyungsService {
  ilchonpyungsRepository = new IlchonpyungsRepository();
  createBest = async (req, res, next) => {
    const { ilchonpyung } = req.body;
    const { userId } = req.params;
    const { user } = res.locals;
    // const user = {
    //   name: '홍길동',
    //   userId: 1,
    // };
    const existUser = await this.ilchonpyungsRepository.findByUser(userId);
    if (!existUser) throw new Error('미니홈피가 존재하지 않습니다.');

    if (!ilchonpyung) throw new Error('일촌평을 작성해주세요.');
    if (ilchonpyung.length < 3)
      throw new Error('일촌평을 3자이상 입력해주세요.');

    if (+userId === user.userId)
      throw new Error('내 미니홈피에는 일촌평 작성이 불가합니다.');

    return await this.ilchonpyungsRepository.createBest({
      userId,
      name: user.name,
      writerId: user.userId,
      ilchonpyung,
    });
  };

  getBests = async (req, res, next) => {
    const { userId } = req.params;

    return await this.ilchonpyungsRepository.getBests(userId);
  };

  deleteBest = async (req, res, next) => {
    const { userId, ilchonId } = req.params;
    const { user } = res.locals;
    // const user = {
    //   userId: 1,
    // };

    const best = await this.ilchonpyungsRepository.findByBest(ilchonId);

    if (!best) throw new Error('존재하지 않는 일촌평입니다.');

    if (best.writerId !== user.userId)
      throw new Error('본인이 작성한 일촌평이 아닙니다.');

    await this.ilchonpyungsRepository.deleteBest(userId, ilchonId);
  };
}
module.exports = IlchonpyungsService;
