var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galactic Bank' });
});

router.get('/enrollment', function(req, res, next) {
  res.render('enrollment', { title: 'Galactic Bank' });
});

module.exports = router;
