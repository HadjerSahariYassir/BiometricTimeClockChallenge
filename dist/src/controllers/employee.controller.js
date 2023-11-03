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
exports.getAllEmployees = void 0;
const employee_service_1 = require("../services/employee.service");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we call service of getemployees
        const objService = yield (0, employee_service_1.getAllEmployeesService)();
        if (objService.status) {
            return res.status(200).json({
                data: objService.data,
                message: objService.message
            });
        }
        else {
            return res.status(200).json({
                data: objService.data,
                message: objService.message
            });
        }
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.getAllEmployees = getAllEmployees;
