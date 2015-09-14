var pg = require('pg');
var formidable = require('formidable')
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
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            console.log(files);
            if (err) {
                console.error(err.message);
                return;
            }
            for (var i = 0; i < files.length; i++) {
                console.log(files[i]);
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
        });
        return res.json("");
    }
}