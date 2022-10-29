const DiaryService = require('../services/diaries.services');

class DiaryController {
  diaryController = new DiaryService();

  getDiary = async (req, res) => {
    const { userId } = req.params;
    const diaries = await this.diaryController.findAllDiary(userId);

    res.status(200).json({ data: diaries });
  };

  createDiary = async (req, res) => {
    const { userId } = req.params;
    const { content, diaryNo } = req.body;

    const createDiaryData = await this.diaryController.createDiary(
      userId,
      content,
      diaryNo
    );
    res.status(200).json({ data: createDiaryData });
  };

  updateDiary = async (req, res) => {
    const { diaryId, userId } = req.params;
    const { content } = req.body;

    const updateDiaryData = await this.diaryController.updateDiary(
      diaryId,
      userId,
      content
    );
    res.status(200).json({ data: updateDiaryData });
  };

  deleteDiary = async (req, res) => {
    const { diaryId } = req.params;

    const deleteDiaryData = await this.diaryController.deleteDiary(diaryId);
    res.status(200).json({ data: deleteDiaryData });
  };
}

module.exports = DiaryController;
