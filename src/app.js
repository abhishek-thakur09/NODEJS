
const express = require('express');
const connectdb = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const AuthRouter = require('./Routes/Auth');
const ProfileRouter = require('./Routes/Profile');
const RequestRouter = require('./Routes/Request');
const UserRouter = require('./Routes/user');
const cors = require("cors");
const http = require("http");
const initializeServer = require("./utils/Socket");
const chatRouter = require('./src/Routes/chat.js');




// its tell us where is our frontend is hoisted 
app.use(
     cors(
    {
        origin: "http://localhost:5173",
        credentials:true,
    }
));

// middleware to convert our input data into json
app.use(express.json());
app.use(cookieParser());


app.use("/", AuthRouter);

app.use("/", ProfileRouter);

app.use("/", RequestRouter);

app.use("/", UserRouter);

app.use("/", chatRouter);



// This line means you will create a server on the top of express app
const server = http.createServer(app);
initializeServer(server);






connectdb().then(() => {
    console.log("database connection is successfull!!");

    // in above line we connect our database  then we make our prepared to listening the requests....

    server.listen(9999, () => {
        console.log("Our server is running successfully in 9999");
    })
}).catch((err) => {
    console.error("database cannot be connected" + err);
});





// app.listen(9999, ()=>{
//     console.log("Our server is running successfully in 9999");
// })

