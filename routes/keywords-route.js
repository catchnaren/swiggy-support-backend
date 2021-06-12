const express = require('express');

const keywordsController = require('../controllers/keywords-controller');

const router = express.Router();

router.get('/', keywordsController.getKeywords);
