import * as express from "express";
import {
    getAllTimeClocks,
    createTimeClockCheckIn,
    createTimeClockCheckOut, 
    deleteTimeClocksByEmployee
} from "../controllers/timeClock.controller"


const timeClockRouter = express.Router();
// get all timeClocks for an employee
timeClockRouter.get("/employees/:id/timeClocks", getAllTimeClocks);
// save a new timeclock checkin for an employee
timeClockRouter.post("/employees/:id/timeClocks/check-in", createTimeClockCheckIn)
// update the checkout of the employee who was checkedin before
timeClockRouter.put("/employees/:id/timeClocks/check-out", createTimeClockCheckOut)
// delete timecloks of an employee 
timeClockRouter.delete("/employees/:id/timeClocks", deleteTimeClocksByEmployee)

export default timeClockRouter;