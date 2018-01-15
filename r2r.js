var xp = require('express');
var mg = require('mongodb');

var r2r = xp();

var login = function(req, res){
    res.status(501);
}

var new_key = function(req, res){
    // TODO better security
    res.status(501);
}


var get_program = function(req, res){
    res.status(501);
}

var save_program = function (req, res){
    res.status(501);
}

r2r.get("/get", get_program);
r2r.post("/save", save_program);
r2r.post("/auth", login);
