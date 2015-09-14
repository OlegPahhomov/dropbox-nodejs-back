var express = require('express');
var router = express.Router();

var getFiles = require('./getFiles.js')
var postFiles = require('./postFiles')

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/files', function (req, res) {
    getFiles.getFiles(req, res);
});
router.get('/picture/:id', function (req, res) {
    getFiles.getPicture(req, res);
});
router.get('/picture/small/:id', function (req, res) {
    getFiles.getThumbnail(req, res);
});
router.post('/remove/:id', function(req, res){
    postFiles.deleteFile(req, res);
});
router.post('/add', function(req, res){
    postFiles.addFiles(req, res);
});

module.exports = router;
