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
// this employee id is used in apis tests, create a new employee from databse and pick up it's id
const employeeID = "65461428d3c2dc46dd19ae0c";
describe("TimeClock Tests", () => {
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
    describe("Endpoint Get employee timeClock data employees/:id/timeClocks", () => {
        // should respond with 200 status code : success
        // should respond with json object containing the data
        test("given the write path should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).get(`/employees/65461428d3c2dc46dd19ae0c/timeClocks`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
            expect(response.body.message).toBe("employees are retrieved succussfully");
        }));
        // errors cases
        // wrong employee id
        test("given wrong id in the path should give error 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).get(`/employees/${employeeID}55/timeClocks`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message");
        }));
    });
    describe("EndPoint for checkIn : POST /employees/:id/timeClocks/check-in", () => {
        // should save the timeClock (checkin)
        // should respond with 201 status code
        test(`given employee with correct path :
               employee id is valid : employee exists in database
               employee should check-in for first time or checkin again after checkout
               body contains comment in request params
               should return a 201`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).post(`/employees/${employeeID}/timeClocks/check-in`).send({
                comment: "employee checkin"
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
        }));
        //case of errors:
        // when employee has already check-in without checkout6
        test('when one of the rquired is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            //should respond with 400 bad request
            const response = yield request(index_1.app).post(`/employees/${employeeID}/timeClocks/check-in`).send({
                comment: "employee checkin"
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("could not add a check-in after another check in with an empty check-out");
        }));
    });
    describe("EndPoint for checkPoint : PUT /employees/:id/timeClocks/check-out", () => {
        // should save the timeClock (checkin)
        // should respond with 201 status code
        test(`given employee with correct path :
               employee id is valid : employee exists in database
               employee should check-out after another check-in in same day
               body contains comment in request params
               should return a 200`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request(index_1.app).put(`/employees/${employeeID}/timeClocks/check-out`).send({
                comment: "employee checkout"
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
        }));
        //case of errors:
        // when employee did't Check-in in databse in same day
        // test depends on employee timeClocks so you should choose the an example that gives the error
        test('when one of the rquired is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            //should respond with 400 bad request
            const response = yield request(index_1.app).put(`/employees/${employeeID}/timeClocks/check-out`).send({
                comment: "employee checkin"
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("could not add this checkout, another checkout was done before or there is no check-in today");
        }));
    });
});
