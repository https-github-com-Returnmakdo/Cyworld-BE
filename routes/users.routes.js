const express = require('express');
const router = express.Router();
const authlogin = require('../middlewares/authLoginUserMiddleware');
const UsersController = require('../controllers/users.controllers');
const usersController = new UsersController();

router.post('/signup',authlogin,usersController.signup);
router.post('/login',authlogin,usersController.login)
router.get('/emailcheck',usersController.emailCheck)

module.exports = router;
