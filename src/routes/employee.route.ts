import * as express from "express";
import {
    getEmployees,
    createEmployee,
    deleteEmployeeByID,
    deleteALl
} from "../controllers/employee.controller"


const employeeRouter = express.Router();
// Get All employees objects or get specific employees with filter by dateCreation /employees?date="2023-11-03"
employeeRouter.get("/employees", getEmployees); 
// save employee object into database
employeeRouter.post("/employees", createEmployee); 
// Delete an employees by id
employeeRouter.delete("/employees/:id", deleteEmployeeByID)
// Delete all employees 
employeeRouter.delete("/employees", deleteALl)

export default employeeRouter;