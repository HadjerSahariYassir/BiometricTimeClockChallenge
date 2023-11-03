"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeModel = void 0;
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const employee = new Schema({
    lastName: { type: Number,
        required: true
    },
    firstName: { type: Number,
        required: true
    },
    dateCreated: { type: Number,
        required: true
    },
    departement: { type: Number,
        required: true
    },
    phone: { type: Number,
        required: false
    },
    adresse: {
        type: String,
        required: false
    }
});
exports.employeeModel = mongoose_1.default.model("employee", employee);
