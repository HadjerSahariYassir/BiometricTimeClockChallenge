"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express = require("express");
const mongoose_1 = require("mongoose");
const timeClock_route_1 = require("./src/routes/timeClock.route");
const employee_route_1 = require("./src/routes/employee.route");
const bodyParser = require("body-parser");
const config_1 = require("./config/config");
exports.app = express();
//database connexion
const dbConnexion = (user, password) => {
    return `mongodb+srv://${user}:${password}@timeclocktest.5oi7m2l.mongodb.net/?retryWrites=true&w=majority`;
};
let database = dbConnexion(config_1.USER_DB, config_1.PASSWORD_DB);
mongoose_1.default.connect(database, err => {
    console.log("error ", err);
    if (err == null) {
        console.log("Database was connected successfully");
    }
    else {
        console.log("Database was not connected successfully");
    }
});
//Body Parser
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use(bodyParser.json());
//Routes 
exports.app.use("", timeClock_route_1.default);
exports.app.use("", employee_route_1.default);
exports.app.get('/', (req, res) => {
    return res.send("hello world");
});
//server runing
exports.server = exports.app.listen(config_1.PORT, () => {
    console.log(`server is runing on port https://${config_1.HOST}:${config_1.PORT}`);
});
// server static file
exports.app.use(express.static('public'));
exports.default = exports.app;
