const { Diaries } = require('../models');

class DiaryRepository {
  findAllDiary = async (userId) => {
    // 다양한 유저들이 존재해서 해당 유저가 작성한 게시글이 필요함
    const diaries = await Diaries.findAll({ where: { userId } });
    return diaries;
  };

  createDiary = async (userId, dirImg, content, diaryNo) => {
    const createDiaryData = await Diaries.create({
      userId,
      // name,
      dirImg,
      content,
      diaryNo,
    });
    return createDiaryData;
  };

  updateDiary = async (diaryId, dirImg, content) => {
    const updateDiaryData = await Diaries.update(
      { content, dirImg },
      { where: { diaryId } }
    );

    return await Diaries.findOne({ where: { diaryId } });
  };

  deleteDiary = async (diaryId) => {
    const deleteDiaryData = await Diaries.destroy({ where: { diaryId } });
    return deleteDiaryData;
  };
}

module.exports = DiaryRepository;
