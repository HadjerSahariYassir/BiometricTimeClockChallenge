"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const timeClockRouter = express.Router();
timeClockRouter.get("/employees", employee_controller_1.getAllEmployees);
//timeClockRouter.post("/", createEmployee)
exports.default = timeClockRouter;
