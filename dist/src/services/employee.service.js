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
exports.getEmployeesByDateService = exports.createEmployeeService = exports.getAllEmployeesService = void 0;
const employee_model_1 = require("../models/employee.model");
//get all employees service
const getAllEmployeesService = () => __awaiter(void 0, void 0, void 0, function* () {
    let employees = yield employee_model_1.employeeModel.find();
    if (employees)
        return employees;
});
exports.getAllEmployeesService = getAllEmployeesService;
// save employee into database service 
const createEmployeeService = (employeeObject) => __awaiter(void 0, void 0, void 0, function* () {
    // get now time
    var now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconde = now.getSeconds();
    const nowDate = new Date(year, month, day, hour, minute, seconde);
    var newEmployee = new employee_model_1.employeeModel({
        lastName: employeeObject.lastName,
        firstName: employeeObject.firstName,
        dateCreated: employeeObject.dateCreated ? employeeObject.dateCreated : nowDate,
        department: employeeObject.department,
        phone: employeeObject.phone,
        address: employeeObject.address
    });
    let data = yield newEmployee.save();
    let objectSaved;
    if (data) {
        objectSaved = {
            id: String(data._id),
            lastName: data.lastName,
            firstName: data.firstName,
            dateCreated: data.dateCreated,
            department: data.department,
            phone: data.phone,
            address: data.address
        };
    }
    return objectSaved;
});
exports.createEmployeeService = createEmployeeService;
//get employees by date creation service
const getEmployeesByDateService = (dateCreation) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield employee_model_1.employeeModel.find({ dateCreated: { $gte: dateCreation, $lt: new Date(dateCreation.getTime() + 86400000) } });
    if (employees) {
        return employees;
    }
});
exports.getEmployeesByDateService = getEmployeesByDateService;
