"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const employeeRouter = express.Router();
// Get All employees objects or get specific employees with filter by dateCreation /employees?date="2023-11-03"
employeeRouter.get("/employees", employee_controller_1.getEmployees);
// save employee object into database
employeeRouter.post("/employees", employee_controller_1.createEmployee);
// Delete an employees by id
employeeRouter.delete("/employees/:id", employee_controller_1.deleteEmployeeByID);
// Delete all employees 
employeeRouter.delete("/employees", employee_controller_1.deleteALl);
exports.default = employeeRouter;
