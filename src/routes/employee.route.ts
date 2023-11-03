import * as express from "express";
import {
    getEmployees,
    createEmployee
} from "../controllers/employee.controller"


const employeeRouter = express.Router();
// Get All employees objects or get specific employees with filter by dateCreation /employees?date="2023-11-03"
employeeRouter.get("/employees", getEmployees); 
// save employee object into database
employeeRouter.post("/employees", createEmployee); 



export default employeeRouter;