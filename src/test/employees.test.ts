import * as request from "supertest"
import { app, server } from "../../index"
import * as mongoose from "mongoose";


describe("Employee Tests", () => {
    afterAll((done) => {
        // Close the Mongoose connection after all tests are done
        mongoose.disconnect((err) => {
          if (err) {
            console.error('Error closing Mongoose connection:', err);
          } else {
            console.log('Mongoose connection closed.');
          }
          done();
          mongoose.connection.close()
        });
      });
      
      afterAll((done) => {
          server.close(() => {
            done();
          }); 
        });

    describe("Get employees data /employees", () => {
        // should respond with 200 status code : success
        // should respond with json object containing the data
        test("given the write path should return 200", async() => {
            const response = await request(app).get("/employees")
            expect(response.status).toBe(200)
        })
        test("should return response with data in the body", async() => {
            const response = await request(app).get("/employees")
            expect(response.body.data).toBeDefined()
        })
        //test filter by date creation
        test("given the write path with correct date should return 200", async() => {
            const response = await request(app).get("/employees?dateCreated=2023-11-02")
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("data")
        })
        test("given a wrong date should return invalid date", async() => {
            const response = await request(app).get("/employees?dateCreated=2023-13-02")
            expect(response.status).toBe(400)
            expect(response.body.message).toBe("Invalid date. Please provide a valid date.")
        })
   })

   describe("Post a new employee  /employees ", () => {
        // should save the employee 
        // should respond with json object containing the data
        // should respond with 201 status code 
        test("given an employee with the required attributes,should return a 200", async() => {
            const response = await request(app).post("/employees").send({
                    lastName: "sahari",
                    firstName:"hadjer",
                    dateCreated: null,
                    department:"DIT",
                    phone:"0795607030",
                    address:"city X building 10 Reghaia"  
            })
            expect(response.status).toBe(201);
        })
        test("should should specify json in the content of type header",  async () => {
            const response = await request(app).post("/employees").send({
                lastName: "sahari",
                firstName:"hadjer",
                dateCreated: null,
                department:"DIT",
                phone:"0795607030",
                address:"city X building 10 Reghaia"  
             })
           expect(response.headers['content-type']).toEqual((expect.stringContaining("json")));
        })
        test("response has employee id", async() => {
            const response = await request(app).post("/employees").send({
                lastName: "sahari",
                firstName:"hadjer",
                dateCreated: null,
                department:"DIT",
                phone:"0795607030",
                address:"city X building 10 Reghaia"  
             })
           expect(response.body.data.id).toBeDefined();
        })
         //case of errors:
        test('when one of the rquired is missing', async() => {
            //should respond with 400 bad request
            const response = await request(app).post("/employees").send({
            dateCreated: null,
            department:"DIT",
            phone:"0795607030",
            address:"city X building 10 Reghaia"  
            })
        expect(response.status).toBe(400);
    })
  })
})


       

  
  
  
  