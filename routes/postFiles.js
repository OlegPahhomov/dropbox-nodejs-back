var pg = require('pg');
var util = require('util');
var formidable = require('formidable');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:12345@localhost:5432/postgres';


module.exports = {
    deleteFile: function (req, res) {
        var id = req.params.id;
        pg.connect(connectionString, function (err, client, done) {
            var query = client.query("DELETE FROM content WHERE file_id = ($1)", [id]);
            var query2 = client.query("DELETE FROM file WHERE id = ($1)", [id]);

            query2.on('end', function () {
                client.end();
                return res.json("");
            });
            if (err) {
                console.log(err);
            }
        });
    },
    addFiles: function (req, res) {
        var form = new formidable.IncomingForm(),
            files = [];

        form
            .on('file', function (field, file) {
                files.push(file);
            })
            .on('end', function () {
                for (var i = 0; i < files.length; i++) {
                    console.log(i);
                    var file = files[i];
                    //insert to db
                }
                //res.writeHead(200, {'content-type': 'text/plain'});
                //res.end('received files:\n\n ' + util.inspect(files));
            });
        form.parse(req);
        return res.json("");
        /*pg.connect(connectionString, function (err, client, done) {
         var query = client.query("INSERT INTO FILE ( name, ratio ) values ($1, $2)", [files[0].name], 1);
         //var query2 = client.query("INSERT INTO CONTENT(file_id, type, content) VALUES ($1, $2, $3)", []);

         query.on('end', function () {
         client.end();
         return res.json("");
         });
         if (err) {
         console.log(err);
         }
         });*/
    }
};