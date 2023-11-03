"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const timeClock_controller_1 = require("../controllers/timeClock.controller");
const timeClockRouter = express.Router();
// get all timeClocks for an employee
timeClockRouter.get("/employees/:id/timeClocks", timeClock_controller_1.getAllTimeClocks);
// save a new timeclock checkin for an employee
timeClockRouter.post("/employees/:id/timeClocks/check-in", timeClock_controller_1.createTimeClockCheckIn);
// update the checkout of the employee who was checkedin before
timeClockRouter.put("/employees/:id/timeClocks/check-out", timeClock_controller_1.createTimeClockCheckOut);
exports.default = timeClockRouter;
