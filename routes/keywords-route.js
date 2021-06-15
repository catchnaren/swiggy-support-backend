const express = require('express');

const keywordsController = require('../controllers/keywords-controller');

const router = express.Router();

router.get('/', keywordsController.getKeywords);

router.get('/:kid', keywordsController.getKeywordById);

router.get('/keyword/:keyText', keywordsController.getKeywordByKeyText);

router.post('/', keywordsController.postKeywords);

router.patch('/:kid', keywordsController.updateKeyword);

router.delete('/:kid', keywordsController.deleteKeyword);

module.exports = router;
