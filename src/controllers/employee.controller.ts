import { Response , Request } from "express"
import { createEmployeeService, getAllEmployeesService, getEmployeesByDateService } from "../services/employee.service"
import { employeeModel } from "../models/employee.model"
import { EMPLOYEE_OBJECT } from "../../unit/unit"


export const getEmployees = async (req: Request, res: Response) => {
   try {
     const { dateCreated } = req.query;
 
     if (dateCreated) { // check if there a filter date
       // If a 'dateCreated' query parameter is provided, filter employees by date
       const pattern = /^\d{4}-\d{2}-\d{2}$/;
 
       if (!pattern.test(dateCreated as string)) {
          res.status(400).json({ message: "Invalid date format" });
       }
 
       const convertedDate: Date = new Date(dateCreated as string);
 
       if (isNaN(convertedDate.getTime())) {
          res.status(400).json({ message: "Invalid date. Please provide a valid date." });
       }
 
       const employees = await getEmployeesByDateService(convertedDate);
 
       if (employees) {
         if(employees.length != 0) 
             res.status(200).json({
               data: employees,
               message: "Filtering employees by date creation is done successfully!",
            });
         else  res.status(200).json
              ({  data: employees, 
                  message: "no data in that date"
              })
       }
     } else {
       // If 'dateCreated' is not given so get all employees
       const employees = await getAllEmployeesService();
 
       if (employees) {
         return res.status(200).json({
           data: employees,
           message: "Employees are retrieved successfully!",
         });
       }
     }
   } catch (error) {
     res.json({ message: error.message });
   }
 };

// create a new employee to the database
export const createEmployee = async (req: Request, res: Response) => {
   try {
         let employeeObj: EMPLOYEE_OBJECT = req.body;
         
         const { lastName, firstName, department } = employeeObj;

         if(!lastName || !firstName  || !department){
            res.status(400).json({
               message: "please fill the required attributes!"
            })
         }else {
            const employee = await  createEmployeeService(employeeObj);

            if(employee) 
              {  res.status(201).json({
                  message: employee
              })} 
         }
      
   }catch(error){
       res.status(400).json({
         message: error.message
     })
   }
}


