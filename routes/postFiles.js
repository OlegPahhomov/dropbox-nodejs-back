var pg = require('pg');
var util = require('util');
var formidable = require('formidable');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:12345@localhost:5432/postgres';


module.exports = {
    deleteFile: function (req, res) {
        var id = req.params.id;
        pg.connect(connectionString, function (err, client, done) {
            var deleteContent = client.query("DELETE FROM content WHERE file_id = ($1)", [id]);
            deleteContent.on('end', function () {
                var deleteFile = client.query("DELETE FROM file WHERE id = ($1)", [id]);
                deleteFile.on('end', function () {
                    client.end();
                    return res.json("");
                });
            });
        });
    },
    addFiles: function (req, res) {
        var form = new formidable.IncomingForm();
        var files = [];

        form
            .on('file', function (field, file) {
                files.push(file);
            })
            .on('end', function () {
                for (var i = 0; i < files.length; i++) {
                    console.log(i);
                    var file = files[i];
                }
            });
        form.parse(req);
        return res.json("");
    }
};

/*pg.connect(connectionString, function (err, client, done) {
 for (var i = 0; i < files.length; i++) {
 console.log("any post?")
 var file = files[i];
 var name = file.name;
 var insertFile = client.query("INSERT INTO FILE ( name, ratio ) values ($1, $2)", [name], 1);
 insertFile.on('end', function () {
 console.log("123");
 /!*var insertContent = client.query("INSERT INTO CONTENT(file_id, type, content) VALUES ($1, $2, $3)", [10, 'picture', file._writeStream]);
 insertContent.on('end', function () {*!/
 client.end();
 return res.json("");
 //});
 });

 }
 })
 ;*/