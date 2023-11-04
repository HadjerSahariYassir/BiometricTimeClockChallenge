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
exports.convertTimClockToObject = exports.createCheckOutService = exports.createCheckInService = exports.getAllTimeClocksService = void 0;
const timeClock_model_1 = require("../models/timeClock.model");
const getAllTimeClocksService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let timeClocks = yield timeClock_model_1.timeClockModel.find({
        employeeId: id
    });
    if (timeClocks) {
        const convertedData = timeClocks.map((item) => (0, exports.convertTimClockToObject)(item));
        return convertedData;
    }
    else {
        return "Verify employee ID";
    }
});
exports.getAllTimeClocksService = getAllTimeClocksService;
const createCheckInService = (timeClockObject) => __awaiter(void 0, void 0, void 0, function* () {
    // get now time
    var now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconde = now.getSeconds();
    const nowDate = new Date(year, month, day, hour, minute, seconde);
    var newTimeClock = new timeClock_model_1.timeClockModel({
        checkIn: nowDate,
        checkOut: null,
        comment: timeClockObject.comment,
        total: 0,
        employeeId: timeClockObject.employeeId
    });
    // check if there another checkIn in same day of this employe if yes return error
    const nowDayDate = new Date(year, month, day);
    const timeClocks = yield timeClock_model_1.timeClockModel.find({
        $and: [
            { checkIn: { $gte: nowDayDate, $lt: new Date(nowDayDate.getTime() + 86400000) } },
            { employeeId: newTimeClock.employeeId },
            { checkOut: { $eq: null } }
        ]
    });
    if (!timeClocks || timeClocks.length == 0) {
        let data = yield newTimeClock.save();
        return data.toObject();
    }
    else {
        return null;
    }
});
exports.createCheckInService = createCheckInService;
const createCheckOutService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // get now time
    let now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconde = now.getSeconds();
    const nowDate = new Date(year, month, day, hour, minute, seconde);
    // check if there another checkIn in same day of this employe if yes return error
    const nowDayDate = new Date(year, month, day);
    const timeClock = yield timeClock_model_1.timeClockModel.findOne({
        $and: [
            { checkIn: { $gte: nowDayDate, $lt: new Date(nowDayDate.getTime() + 86400000) } },
            { employeeId: params.employeeId },
            { checkOut: null }
        ]
    });
    if (timeClock) { // there is last checedIn without checkout from the employee in same day then
        const timeClockToObject = (0, exports.convertTimClockToObject)(timeClock);
        ; // calculate differnece time between checkin and checkout
        timeClock.checkOut = nowDate;
        timeClock.comment = params.comment ? params.comment : timeClock.comment;
        const time = calculateTimeInHours(timeClockToObject.checkIn, nowDate);
        timeClock.total = time;
        let data = yield timeClock.save(); // save new data (update it)
        return data.toObject();
    }
    else { // there is no checkIn before in that day before so it's error
        return null;
    }
});
exports.createCheckOutService = createCheckOutService;
// make a TIMEcLCOK OBJECT from Responce API
const convertTimClockToObject = (item) => {
    const timeClockObject = {
        checkIn: item.checkIn,
        checkOut: item.checkOut,
        comment: item.comment,
        total: item.total,
        employeeId: item.employeeId
    };
    return timeClockObject;
};
exports.convertTimClockToObject = convertTimClockToObject;
const calculateTimeInHours = (date1, date2) => {
    if (date1 && date2) {
        if (date1 && date2) {
            const time1 = date1.getTime(); // Convert to milliseconds
            const time2 = date2.getTime();
            const timeDifferenceMilliseconds = time2 - time1;
            // Calculate hours, minutes, and seconds
            const seconds = Math.floor((timeDifferenceMilliseconds / 1000) % 60);
            const minutes = Math.floor((timeDifferenceMilliseconds / (1000 * 60)) % 60);
            const hours = Math.floor(timeDifferenceMilliseconds / (1000 * 60 * 60));
            // Format the time difference as "HH:MM:SS"
            const formattedTimeDifference = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return formattedTimeDifference;
        }
        return "invalid input";
    }
    return 0;
};
