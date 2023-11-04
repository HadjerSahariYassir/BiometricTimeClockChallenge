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
exports.deleteTimeClocksByEmployee = exports.createTimeClockCheckOut = exports.createTimeClockCheckIn = exports.getAllTimeClocks = void 0;
const timeClock_service_1 = require("../services/timeClock.service");
const employee_model_1 = require("../models/employee.model");
const timeClock_model_1 = require("../models/timeClock.model");
//get list of all employees
const getAllTimeClocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we call service of getemployees
        const employeeId = req.params.id;
        // check if id is valid
        const employee = yield employee_model_1.employeeModel.findOne({ _id: employeeId });
        if (!employee) {
            res.status(404).json({ message: 'Employee ID is not Valid' });
        }
        else {
            const resultGet = yield (0, timeClock_service_1.getAllTimeClocksService)(employeeId);
            if (typeof resultGet != "string") { // no error
                res.status(200).json({
                    data: resultGet,
                    message: "employees are retrieved succussfully"
                });
            }
            else {
                res.status(404).json({
                    message: resultGet
                });
            }
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});
exports.getAllTimeClocks = getAllTimeClocks;
// create a new employee to the database
const createTimeClockCheckIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body; // contains comment and employeeID
        const params = { comment: comment, employeeId: req.params.id };
        // validation errors: employeeID
        const employee = yield employee_model_1.employeeModel.findOne({ _id: params.employeeId });
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        }
        //call the service:
        const timeClock = yield (0, timeClock_service_1.createCheckInService)(params);
        if (timeClock) {
            res.status(201).json({
                data: timeClock,
                message: "operation of checkin was done successfully"
            });
        }
        else {
            res.status(400).json({
                message: 'could not add a check-in after another check in with an empty check-out'
            });
        }
    }
    catch (error) {
        res.json({
            message: error.message
        });
    }
});
exports.createTimeClockCheckIn = createTimeClockCheckIn;
// create a new employee to the database
const createTimeClockCheckOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body; // contains comment and employeeID
        const params = { comment: comment, employeeId: req.params.id };
        // validation errors: employeeID
        const employee = yield employee_model_1.employeeModel.findOne({ _id: params.employeeId });
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        }
        //call the service:
        const timeClock = yield (0, timeClock_service_1.createCheckOutService)(params);
        if (timeClock) {
            res.status(201).json({
                data: timeClock,
                message: "operation of checkin was done successfully"
            });
        }
        else {
            res.status(400).json({
                message: 'could not add this checkout, another checkout was done before or there is no check-in today'
            });
        }
    }
    catch (error) {
        res.json({
            message: error.message
        });
    }
});
exports.createTimeClockCheckOut = createTimeClockCheckOut;
//delete all timeClocks of an employee
const deleteTimeClocksByEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        // check if id is valid
        const deletedTimeclocks = yield timeClock_model_1.timeClockModel.deleteMany({ employeeId: employeeId });
        if (deletedTimeclocks.deletedCount == 0) {
            res.status(404).json({ message: "employee doesn't exist" });
        }
        else {
            res.status(200).json({ message: "operation delete done successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTimeClocksByEmployee = deleteTimeClocksByEmployee;
