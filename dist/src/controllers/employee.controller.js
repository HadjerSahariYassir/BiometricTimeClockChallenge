"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = exports.getEmployees = void 0;
const employee_service_1 = require("../services/employee.service");
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dateCreated } = req.query;
        if (dateCreated) { // check if there a filter date
            // If a 'dateCreated' query parameter is provided, filter employees by date
            const pattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!pattern.test(dateCreated)) {
                return res.status(400).json({ message: "Invalid date format" });
            }
            const convertedDate = new Date(dateCreated);
            if (isNaN(convertedDate.getTime())) {
                return res.status(400).json({ message: "Invalid date. Please provide a valid date." });
            }
            const employees = yield (0, employee_service_1.getEmployeesByDateService)(convertedDate);
            if (employees) {
                if (employees.length != 0)
                    return res.status(200).json({
                        data: employees,
                        message: "Filtering employees by date creation is done successfully!",
                    });
                else
                    return res.status(200).json({ data: employees,
                        message: "no data in that data"
                    });
            }
        }
        else {
            // If 'dateCreated' is not given so get all employees
            const employees = yield (0, employee_service_1.getAllEmployeesService)();
            if (employees) {
                return res.status(200).json({
                    data: employees,
                    message: "Employees are retrieved successfully!",
                });
            }
        }
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getEmployees = getEmployees;
// create a new employee to the database
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let employeeObj = req.body;
        const { lastName, firstName, department } = employeeObj;
        if (!lastName || !firstName || !department) {
            res.status(400).json({
                message: "please fill the required attributes!"
            });
        }
        const employee = yield (0, employee_service_1.createEmployeeService)(employeeObj);
        if (employee) {
            res.status(201).json({
                message: employee
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
exports.createEmployee = createEmployee;
