var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('index');
});

router.get('/list', (req, res) => {
  res.send('users list');
});

module.exports = router;