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
const request = require("supertest");
const index_1 = require("../../index");
const mongoose = require("mongoose");
describe("Employee Tests", () => {
    afterAll((done) => {
        // Close the Mongoose connection after all tests are done
        mongoose.disconnect((err) => {
            if (err) {
                console.error('Error closing Mongoose connection:', err);
            }
            else {
                console.log('Mongoose connection closed.');
            }
            done();
            mongoose.connection.close();
        });
    });
    afterAll((done) => {
        index_1.server.close(() => {
            done();
        });
    });
    describe("Get employees data /employees", () => {
        // should respond with 200 status code : success
        // should respond with json object containing the data
        test("given the write path should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).get("/employees");
            expect(response.status).toBe(200);
        }));
        test("should return response with data in the body", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).get("/employees");
            expect(response.body.data).toBeDefined();
        }));
        //test filter by date creation
        test("given the write path with correct date should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).get("/employees?dateCreated=2023-11-02");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
        }));
        test("given a wrong date should return invalid date", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).get("/employees?dateCreated=2023-13-02");
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid date. Please provide a valid date.");
        }));
    });
    describe("Post a new employee  /employees ", () => {
        // should save the employee 
        // should respond with json object containing the data
        // should respond with 201 status code 
        test("given an employee with the required attributes,should return a 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).post("/employees").send({
                lastName: "sahari",
                firstName: "hadjer",
                dateCreated: null,
                department: "DIT",
                phone: "0795607030",
                address: "city X building 10 Reghaia"
            });
            expect(response.status).toBe(201);
        }));
        test("should should specify json in the content of type header", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).post("/employees").send({
                lastName: "sahari",
                firstName: "hadjer",
                dateCreated: null,
                department: "DIT",
                phone: "0795607030",
                address: "city X building 10 Reghaia"
            });
            expect(response.headers['content-type']).toEqual((expect.stringContaining("json")));
        }));
        test("response has employee id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).post("/employees").send({
                lastName: "sahari",
                firstName: "hadjer",
                dateCreated: null,
                department: "DIT",
                phone: "0795607030",
                address: "city X building 10 Reghaia"
            });
            expect(response.body.data.id).toBeDefined();
        }));
        //case of errors:
        test('when one of the rquired is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            //should respond with 400 bad request
            const response = yield request(index_1.app).post("/employees").send({
                dateCreated: null,
                department: "DIT",
                phone: "0795607030",
                address: "city X building 10 Reghaia"
            });
            expect(response.status).toBe(400);
        }));
    });
});
