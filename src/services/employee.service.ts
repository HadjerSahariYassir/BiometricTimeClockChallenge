import { employeeModel } from "../models/employee.model";
import { EMPLOYEE_OBJECT } from "../../unit/unit"


//get all employees service
export const getAllEmployeesService = async () => {
        
        let employees = await employeeModel.find();
        if(employees) return employees

 }

// save employee into database service 
 export const createEmployeeService = async (employeeObject: EMPLOYEE_OBJECT): Promise<EMPLOYEE_OBJECT> => {
    // get now time
    var now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconde = now.getSeconds();
    const nowDate: Date = new Date(year, month, day, hour, minute, seconde);

    var newEmployee = new employeeModel({
        lastName: employeeObject.lastName,
        firstName: employeeObject.firstName,
        dateCreated: employeeObject.dateCreated ? employeeObject.dateCreated : nowDate,
        department: employeeObject.department,
        phone: employeeObject.phone,
        address: employeeObject.address
    });

    let data = await newEmployee.save();
    let objectSaved: EMPLOYEE_OBJECT;
    if (data) {
        objectSaved = {
            id: String(data._id),
            lastName: data.lastName,
            firstName: data.firstName,
            dateCreated: data.dateCreated,
            department: data.department,
            phone: data.phone,
            address: data.address
        }
    }
    return objectSaved;
 }

 //get employees by date creation service
 export const getEmployeesByDateService = async (dateCreation: Date) => {
    
    const employees = await employeeModel.find({ dateCreated: { $gte: dateCreation, $lt: new Date(dateCreation.getTime() + 86400000) } });
        if(employees){
            return employees
        }
    
 }

