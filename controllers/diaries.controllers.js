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
    const { name } = res.locals.user;
    const userInfo = res.locals.user;
    if (!content) {
      res.status(400).json({ message: '내용을 입력해주세요!' });
    }
    if (userInfo.userId !== Number(userId)) {
      res.status(400).json({ message: '작성 권한이 없습니다.' });
    }
    // 파일이 있으면 key값으로 이름을 정하고 없으면 null
    const imageFileName = req.file ? req.file.key : null;
    // imageFileName에 파일명이 들어 갔으면 s3 url주소 추가
    const dirImg = imageFileName
      ? process.env.S3_STORAGE_URL + imageFileName
      : null;

    const createDiaryData = await this.diaryController.createDiary(
      userId,
      name,
      dirImg,
      content,
      diaryNo
    );
    res.status(200).json({ data: createDiaryData });
  };

  updateDiary = async (req, res) => {
    const { diaryId, userId } = req.params;
    const { content } = req.body;

    // 수정사항에 이미지 파일이 있으면 key값으로 이름 정해주고 없으면 Null
    const imageFileName = req.file ? req.file.key : null;
    // imageFileName에 파일명 들어가면 s3 url주소 추가
    const dirImg = imageFileName
      ? process.env.S3_STORAGE_URL + imageFileName
      : undefined;
    const updateDiaryData = await this.diaryController.updateDiary(
      diaryId,
      userId,
      dirImg,
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
