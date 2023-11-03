"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose_1 = require("mongoose");
var timeClock_route_1 = require("./src/routes/timeClock.route");
var config_1 = require("./config/config");
var app = express();
//database connexion
var dbConnexion = function (user, pass) {
    return "|";
};
var database = dbConnexion(config_1.USER_DB, config_1.PASSWORD_DB);
mongoose_1["default"].connect(database, function (err) {
    if (!err) {
        console.log("Database was connected successfully");
    }
    else {
        console.log("Database was not connected successfully");
    }
});
//Routes 
app.use("", timeClock_route_1["default"]);
app.get('/', function (req, res) {
    return res.send("hello world");
});
//server runing
app.listen(config_1.PORT, function () {
    console.log("server is runing on port https://".concat(config_1.HOST, ":").concat(config_1.PORT));
});
