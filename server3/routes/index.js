var express = require('express');
// Express Router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//exports
module.exports = router;


