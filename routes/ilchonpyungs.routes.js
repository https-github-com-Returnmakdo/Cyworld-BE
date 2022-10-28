const express = require('express');
const router = express.Router();
const IlchonpyungsController = require('../controllers/ilchonpyungs.controllers');
const ilchonpyungsController = new IlchonpyungsController();

router.route('/:userId').post(ilchonpyungsController.createBest);
//   .get(ilchonpyungsController.getBests)
//   .delete(ilchonpyungsController.deleteBest);

module.exports = router;
