import  express from "express";
const app = express();
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import guidRouter from "./routes/guid.js";
import packageRouter from "./routes/package.js";
import reviewRouter from "./routes/review.js";
import cors  from "cors";
import cookieParser from "cookie-parser";

//middleware
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
})
);
app.use(cookieParser())


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/guid", guidRouter);
app.use("/api/package", packageRouter);
app.use("/api/review", reviewRouter);
// const bodyParser = require("body-parser");
// const mysql = require("mysql2");
// const cors = require("cors");

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "12345",
//     database: "crud"
// });

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/api/get", (req, res) =>{
//     const sqlGet = "select * from contact_crud";
//     db.query(sqlGet, (error, result) =>{
//         res.send(result);
//     })
// })

// app.get("/", (req, res) => {
//     const sqlInsert = "insert into contact_crud(name, email, contact) value('ash numb', 'numbash@gmail.com', 9869328585)";
//     db.query(sqlInsert, (error, result) =>{
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello Express"); 
//     });
// });

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
})