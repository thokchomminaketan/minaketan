const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controller/contactController');

router.post('/', sendMessage);

module.exports = router;