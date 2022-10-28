const DiaryRepository = require('../repositories/diaries.repositories');

class DiaryService {
  diaryService = new DiaryRepository();

  findAllDiary = async (userId) => {
    // 저장소에서 데이터요청
    const allDiary = await this.diaryService.findAllDiary(userId);

    // 호출한 Diary들 중 가장 최근 게시글순으로 정렬
    allDiary.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 사용자에게 보여줄 데이터를 가공
    return allDiary.map((diary) => {
      return {
        diaryId: diary.diaryId,
        userId: diary.userId,
        content: diary.content,
        diaryNo: diary.diaryNo,
        createdAt: diary.createdAt,
        updatedAt: diary.updatedAt,
      };
    });
  };

  createDiary = async (userId, content, diaryNo) => {
    const createDiaryData = await this.diaryService.createDiary(
      userId,
      content,
      diaryNo
    );

    return {
      diaryId: createDiaryData.diaryId,
      userId: createDiaryData.userId,
      content: createDiaryData.content,
      diaryNo: createDiaryData.diaryNo,
      createdAt: createDiaryData.createdAt,
    };
  };

  updateDiary = async (diaryId, userId, content) => {
    const updateDiaryData = await this.diaryService.updateDiary(
      diaryId,
      userId,
      content
    );

    return {
      diaryId: updateDiaryData.diaryId,
      userId: updateDiaryData.userId,
      content: updateDiaryData.content,
      diaryNo: updateDiaryData.diaryNo,
      createdAt: updateDiaryData.createdAt,
    };
  };

  deleteDiary = async (diaryId) => {
    const deleteDiaryData = await this.diaryService.deleteDiary(diaryId);

    return {
      diaryId: deleteDiaryData.diaryId,
      userId: deleteDiaryData.userId,
      content: deleteDiaryData.content,
      diaryNo: deleteDiaryData.diaryNo,
      createdAt: deleteDiaryData.createdAt,
    };
  };
}

module.exports = DiaryService;
