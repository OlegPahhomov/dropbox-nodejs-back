var express = require('express');
var router = express.Router();

var dbOperations = require('./getfiles.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/files', function (req, res) {
    dbOperations.getFiles(req, res);
});
router.get('/picture/:id', function (req, res) {
    dbOperations.getPicture(req, res);
});
router.get('/picture/small/:id', function (req, res) {
    dbOperations.getThumbnail(req, res);
});


module.exports = router;
