
var pg = require('pg');
var connectionString = 'postgres://postgres:12345@localhost:5432/postgres';

var client = new pg.Client(connectionString);
client.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM FILE', function (err, result) {
        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].name);
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();
    });
});