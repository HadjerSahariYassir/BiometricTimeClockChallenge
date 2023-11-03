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
exports.getAllEmployeesService = void 0;
const employee_model_1 = require("../models/employee.model");
const getAllEmployeesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let employees = yield employee_model_1.employeeModel.find();
        return { status: true, message: "operation was done successfuly", data: employees };
    }
    catch (error) {
        return { status: false, message: error.message };
    }
});
exports.getAllEmployeesService = getAllEmployeesService;
