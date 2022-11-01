module.exports = (req, res, next) => {
  try {
    console.log(req.headers)
    const { accessToken, refreshToken } =
      req.headers.authorization || req.cookies;
    if (accessToken || refreshToken) {
      return res.status(403).send({
        errorMessage: '이미 로그인이 되어있습니다.',
      });
    }

    if (!req.header.auth) {
      return next();
    }

    next();
  } catch (error) {
    console.trace(error);
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  }
};
