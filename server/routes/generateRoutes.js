const express = require('express');
const router = express.Router();
const generatorController = require('../controllers/generatorController');

router.post('/generate-paper', generatorController.generatePaper);

module.exports = router;
