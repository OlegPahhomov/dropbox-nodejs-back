var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:12345@localhost:5432/postgres';

module.exports = {
    getFiles: function (req, res) {
        var results = [];
        pg.connect(connectionString, function (err, client, done) {
            var query = client.query("SELECT * FROM FILE");
            query.on('row', function (row) {
                results.push(row);
            });
            query.on('end', function () {
                client.end();
                return res.json(results);
            });
            if (err) {
                console.log(err);
            }
        });
    },
    getPicture: function (req, res){
        var results = [];
        var id = req.params.id;
        pg.connect(connectionString, function (err, client, done) {
            var query = client.query("select content from content where file_id = ($1) and type = 'picture'", [id]);
            query.on('row', function (row) {
                results.push(row.content);
            });
            query.on('end', function () {
                client.end();
                res.end(results[0], 'binary');
                return res;
            });
            if (err) {
                console.log(err);
            }
        });
    },
    getThumbnail: function (req, res){
        var results = [];
        var id = req.params.id;
        pg.connect(connectionString, function (err, client, done) {
            var query = client.query("select content from content where file_id = ($1) and type = 'thumbnail'", [id]);
            query.on('row', function (row) {
                results.push(row.content);
            });
            query.on('end', function () {
                client.end();
                res.end(results[0], 'binary');
                return res;
            });
            if (err) {
                console.log(err);
            }
        });
    }
};