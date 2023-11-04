import * as express from "express";
import mongoose from 'mongoose';
import  timeClockRouter from "./src/routes/timeClock.route";
import employeeRouter from "./src/routes/employee.route";
import * as bodyParser from 'body-parser';

import { HOST, PORT, USER_DB, PASSWORD_DB}  from "./config/config";



export const app = express();

//database connexion
const dbConnexion = (user: string, password: string): string => {
    return `mongodb+srv://${user}:${password}@timeclocktest.5oi7m2l.mongodb.net/?retryWrites=true&w=majority`
}

let database: string = dbConnexion(USER_DB, PASSWORD_DB);

mongoose.connect(database, err => {
    console.log("error ", err)
    if (err == null) {
        console.log("Database was connected successfully");
    } else {
        console.log("Database was not connected successfully");
    }
})


//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes 
app.use("", timeClockRouter)
app.use("", employeeRouter)

app.get('/',(req, res) => {
    return res.send("hello world")
})

//server runing
export const server = app.listen(PORT, () => {
    console.log(`server is runing on port https://${HOST}:${PORT}`)
} )

// server static file
app.use(express.static('public'))

export default app;