"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeClockModel = void 0;
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const timeClock = new Schema({
    checkIn: { type: Date,
        required: false,
    },
    checkOut: { type: Date,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    total: { type: Number,
        required: false
    },
    employeeId: { type: Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
});
exports.timeClockModel = mongoose_1.default.model("timeClock", timeClock);
