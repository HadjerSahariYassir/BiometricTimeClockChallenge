import mongoose from "mongoose";
const { Schema } = mongoose;

const timeClock = new Schema({
    checkIn: 
    {   type: Date,
        required: false,
    },
    checkOut: 
    {   type: Date,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    total: 
    {   type: String,
        required: false
    },
    employeeId: 
    {   type:   Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },

})

export const timeClockModel = mongoose.model("timeClock", timeClock)