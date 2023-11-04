import { Response , Request } from "express"
import { createCheckInService, createCheckOutService, getAllTimeClocksService } from "../services/timeClock.service"
import { TIMECLOCK_OBJECT } from "../../unit/unit"
import { employeeModel } from "../models/employee.model"
import { timeClockModel } from "../models/timeClock.model"


//get list of all employees
export const getAllTimeClocks = async (req: Request , res: Response) => {
   try {
      // we call service of getemployees
      const employeeId = req.params.id as string;
      // check if id is valid
      const employee = await employeeModel.findOne({ _id: employeeId });
      
      if (!employee) {
         res.status(404).json({ message: 'Employee ID is not Valid' });
      }
      else {
        const resultGet : TIMECLOCK_OBJECT[] | string = await getAllTimeClocksService(employeeId)

        if( typeof resultGet != "string"){ // no error
           res.status(200).json({
              data: resultGet,
              message: "employees are retrieved succussfully"
           })
        }else{
          res.status(404).json({
              message: resultGet
          })
        }
      }
      
   }catch (error){
        res.status(404).json({
            message: error.message
        })
   }
}

// create a new employee to the database
export const createTimeClockCheckIn = async (req: Request, res: Response) => {
   try {
        const  { comment }  = req.body; // contains comment and employeeID
        const params = { comment: comment , employeeId : req.params.id}
        // validation errors: employeeID
          const employee = await employeeModel.findOne({ _id: params.employeeId });
      
          if (!employee) {
             res.status(404).json({ message: 'Employee not found' });
          }
        //call the service:
        const timeClock = await createCheckInService(params);
        if(timeClock){
            res.status(201).json({
                data: timeClock,
                message: "operation of checkin was done successfully"
             })
        }else{
            res.status(400).json({
                message: 'could not add a check-in after another check in with an empty check-out'
            })
        }
   }catch(error){
       res.json({
         message: error.message
     })
   }
}



// create a new employee to the database
export const createTimeClockCheckOut = async (req: Request, res: Response) => {
    try {
        const  { comment }  = req.body; // contains comment and employeeID
        const params = { comment: comment , employeeId : req.params.id}
        // validation errors: employeeID
          const employee = await employeeModel.findOne({ _id: params.employeeId });
      
          if (!employee) {
             res.status(404).json({ message: 'Employee not found' });
          }
         //call the service:
         const timeClock = await createCheckOutService(params);

         if(timeClock){
             res.status(201).json({
                 data : timeClock,
                 message: "operation of checkin was done successfully"
              })
         }else{
             res.status(400).json({
                 message: 'could not add this checkout, another checkout was done before or there is no check-in today'
             })
         }
    }catch(error){
        res.json({
          message: error.message
      })
    }
 }

//delete all timeClocks of an employee
export const deleteTimeClocksByEmployee = async (req: Request, res: Response) => {
  try{
    const employeeId = req.params.id as string;
    // check if id is valid
    const deletedTimeclocks = await timeClockModel.deleteMany({ employeeId: employeeId});
    
    if(deletedTimeclocks.deletedCount == 0){
      res.status(404).json({message: "employee doesn't exist"})
    }
    else {
      res.status(200).json({message: "operation delete done successfully"})
    }
  }catch(error){
      res.status(500).json({message: error.message})
  }
}
