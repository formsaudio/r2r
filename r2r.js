const xp = require('express');
const mg = require('mongodb').MongoClient;
const helmet = require('helmet');

const mongo_url = process.env.MONGOURL || "mongodb://localhost:27017";
const server_port = process.env.R2RPORT || 8080;

const r2r = xp();

r2r.use(helmet())

var login = function(req, res) {
    res.status(501);
}

var new_key = function(req, res) {
    // TODO better security
    res.status(501);
}


var get_program = function(req, res) {
    mg.connect(mongo_url, function(err, client) {
            assert.equal(null, err);
            const db = client.db("FA_r2r");
            // TODO validate before returning
            db.collection("programs").findOne({
                    name: req.body.name
                },
                function(err, result) {
                    if (err) {
                        res.status(500);
                    } else {
                        res.send(result)
                    };
                    db.close();
                });
    });
}

var save_program = function(req, res) {
    mg.connect(mongo_url, function(err, client) {
            assert.equal(null, err);
            const db = client.db("FA_r2r");
            // TODO validate before adding
            db.collection("programs").insertOne(req.body.program, function(err, result) {
                if (err) {
                    res.status(500);
                } else {
                    res.send(result)
                };
                db.close();
            });
    });
}

r2r.get("/get", get_program);
r2r.post("/save", save_program);
r2r.post("/auth", login);

r2r.listen(server_port, () => console.log('Started on port ' + server_port))
