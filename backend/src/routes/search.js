const express = require('express');
const router = express.Router();
const { searchPapers, getAutocompleteSuggestions } = require('../controllers/paperController');
const { cacheSearch } = require('../middleware/cache');
const { searchValidation } = require('../middleware/validate');

router.get('/', searchValidation, cacheSearch, searchPapers);
router.get('/autocomplete', getAutocompleteSuggestions);

module.exports = router;
