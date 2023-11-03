"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeModel = void 0;
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const employee = new Schema({
    lastName: { type: String,
        required: [true, "please add a lastname"],
        maxlenght: [50, "lastname can not be more than 50"]
    },
    firstName: { type: String,
        required: [true, "please add a lastname"],
        maxlenght: [50, "firstname can not be more than 50"]
    },
    dateCreated: { type: Date,
        required: [false, "please add a dateCreated"],
        default: Date.now()
    },
    department: { type: String,
        required: [true, "please add a department"],
        maxlenght: [50, "department can not be more than 50"]
    },
    phone: { type: String,
        required: [false, "please add a phone"],
        maxlength: [10, "number phone in algeria could not be more than 10 characters"]
    },
    address: {
        type: String,
        required: [false, "please add an adress"],
    },
});
exports.employeeModel = mongoose_1.default.model("employee", employee);
