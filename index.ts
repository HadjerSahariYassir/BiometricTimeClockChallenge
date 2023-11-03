import * as express from "express";
import timeClock from "./src/routes/timeClock.route";
import mongoose from 'mongoose';
import  timeClockRouter from "./src/routes/timeClock.route";
import employeeRouter from "./src/routes/employee.route";
import * as bodyParser from 'body-parser';

import { HOST, PORT, USER_DB, PASSWORD_DB}  from "./config/config";



const app = express();

//database connexion
const dbConnexion = (user: string, password: string): string => {
    return `mongodb+srv://${user}:${password}@timeclocktest.5oi7m2l.mongodb.net/?retryWrites=true&w=majority`
}

let database: string = dbConnexion(USER_DB, PASSWORD_DB);
console.log(" url db", database)
console.log("hiii")
mongoose.connect(database, err => {
    console.log("error ", err)
    if (err == null) {
        console.log("Database was connected successfully");
    } else {
        console.log("Database was not connected successfully");
    }
})


//Body Parser
/*app.use(express.json())
app.use(express.urlencoded({ extended: true }));*/

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes 
app.use("", timeClockRouter)
app.use("", employeeRouter)

app.get('/',(req, res) => {
    return res.send("hello world")
})

//server runing
app.listen(PORT, () => {
    console.log(`server is runing on port https://${HOST}:${PORT}`)
} )