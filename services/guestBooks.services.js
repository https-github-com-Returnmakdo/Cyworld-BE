const GuestBooksRepository = require('../repositories/guestBooks.repositories');

class GuestBooksService {
  guestBooksRepository = new GuestBooksRepository();

  createBook = async (req, res, next) => {
    const { guestbook } = req.body;
    const { userId } = req.params;
    // const { user } = res.locals;
    const user = {
      userId: 1,
      name: '홍길동',
    };

    if (!guestbook) throw new Error('방명록을 입력해주세요.');
    if (guestbook.length < 3) throw new Error('방명록은 3자이상 입력해주세요.');

    return await this.guestBooksRepository.createBook({
      writerId: user.userId,
      name: user.name,
      userId,
      guestBook: guestbook,
    });
  };

  getBooks = async (req, res, next) => {
    const { userId } = req.params;
    return await this.guestBooksRepository.getBooks(userId);
  };

  updateBook = async (req, res) => {
    const { userId, guestbookId } = req.params;
    const { guestbook } = req.body;
    // const { user } = res.locals;
    const user = {
      userId: 1,
    };
    if (!guestbook) throw new Error('수정할 방명록을 입력해주세요.');
    const findGuestBook = await this.guestBooksRepository.findByGuestBook(
      guestbookId
    );

    if (!findGuestBook) throw new Error('존재하지 않는 방명록입니다.');

    if (findGuestBook.writerId !== user.userId)
      throw new Error('본인이 작성한 방명록이 아닙니다.');

    await this.guestBooksRepository.updateBook(guestbook, guestbookId);
  };

  deleteBook = async (req, res, next) => {
    const { userId, guestbookId } = req.params;
    // const { user } = res.locals;
    const user = {
      userId: 1,
    };
    const findGuestBook = await this.guestBooksRepository.findByGuestBook(
      guestbookId
    );

    if (!findGuestBook) throw new Error('존재하지 않는 방명록입니다.');

    if (findGuestBook.writerId !== user.userId)
      throw new Error('본인이 작성한 방명록이 아닙니다.');

    await this.guestBooksRepository.deleteBook(guestbookId);
  };
}

module.exports = GuestBooksService;
