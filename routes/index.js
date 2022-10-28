const express = require('express');
const router = express.Router();

router.use('/users', require('./user.route'));
router.use('/bests', require('./ilchonpyungs.route'));
router.use('/diaries', require('./diaries.route'));
router.use('/comments', require('./comments.route'));
router.use('/guestbooks', require('./guestBooks.route'));

module.exports = router;
