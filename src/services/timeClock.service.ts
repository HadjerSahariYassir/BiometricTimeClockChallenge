import { timeClockModel } from "../models/timeClock.model";
import { TIMECLOCK_OBJECT, CHECK_PARAMS } from "../../unit/unit"


export const getAllTimeClocksService = async (id: string): Promise<TIMECLOCK_OBJECT[] | string> => {

        let timeClocks = await timeClockModel.find({
            employeeId: id
        });
        if(timeClocks) {
           const convertedData : TIMECLOCK_OBJECT[] =  timeClocks.map((item) => convertTimClockToObject(item))
       
           return convertedData;
        } else {
            return "Verify employee ID"
        }

 }


 export const createCheckInService = async (timeClockObject: CHECK_PARAMS): Promise<TIMECLOCK_OBJECT> => {
    // get now time
    var now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconde = now.getSeconds();
    const nowDate: Date = new Date(year, month, day, hour, minute, seconde);

    var newTimeClock = new timeClockModel({
        checkIn: nowDate,
        checkOut: null,
        comment: timeClockObject.comment,
        total: 0,
        employeeId: timeClockObject.employeeId
    });

    // check if there another checkIn in same day of this employe if yes return error
    const nowDayDate: Date = new Date(year, month, day)

    const timeClocks = await timeClockModel.find({
        $and: [
        { checkIn: { $gte: nowDayDate, $lt: new Date(nowDayDate.getTime() + 86400000) } },
        { employeeId : newTimeClock.employeeId},
        { checkOut: { $eq: null}}
       ]}
    );

    if(!timeClocks ||  timeClocks.length == 0){
        let data = await newTimeClock.save();
       return data.toObject();
    }else {
        return null
    }
 }

 export const createCheckOutService = async (params: CHECK_PARAMS): Promise<TIMECLOCK_OBJECT> => {
    // get now time
    let now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconde = now.getSeconds();
    const nowDate: Date = new Date(year, month, day, hour, minute, seconde);

    // check if there another checkIn in same day of this employe if yes return error
    const nowDayDate: Date = new Date(year, month, day)
    
    const timeClock = await timeClockModel.findOne({
        $and: [ 
           { checkIn: { $gte: nowDayDate, $lt: new Date(nowDayDate.getTime() + 86400000) } },
           { employeeId : params.employeeId},
           { checkOut: null}
        ]
    });
    
    if(timeClock){ // there is last checedIn without checkout from the employee in same day then
                const timeClockToObject = convertTimClockToObject(timeClock);;  // calculate differnece time between checkin and checkout
                timeClock.checkOut = nowDate;
                timeClock.comment = params.comment ? params.comment : timeClock.comment;
                const time = calculateTimeInHours(timeClockToObject.checkIn, nowDate);
                timeClock.total = time;
                
                let data = await timeClock.save(); // save new data (update it)
                return data.toObject();
    } else{ // there is no checkIn before in that day before so it's error
        return null 
    }
 
 }

 // make a TIMEcLCOK OBJECT from Responce API
export const convertTimClockToObject = (item) => {

   const timeClockObject : TIMECLOCK_OBJECT = {
            checkIn: item.checkIn,
            checkOut: item.checkOut,
            comment: item.comment,
            total: item.total,
            employeeId: item.employeeId
        }
    return timeClockObject;

}

const calculateTimeInHours = (date1: Date, date2: Date) => {

    if(date1 && date2) {
        console.log("we are inside")
        const time1 = date1.getTime(); // Convert to milliseconds
        const time2 = date2.getTime();
        const timeDifferenceMilliseconds = time2 - time1;
        const timeDifferenceMinutes = timeDifferenceMilliseconds / (1000 * 60 * 60) ; // Convert to minutes
      
        return timeDifferenceMinutes
    }
    return 0
}