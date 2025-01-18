
const express = require('express');

const app = express();
const {AdminAuth} = require("./middlewares/auth.js");



// This is called the middleware This will called the all admin routes...
app.use("/admin", AdminAuth);


app.get("/admin/getAlldata", (req, res, next)=>{
    //Logic of checking if the request is authorized...
    res.send("all data sent!!");
})

app.get("/admin/deleteUser", (req, res)=>{
    res.send("Delete user!!")
})


app.listen(9999, ()=>{
    console.log("Our server is running successfully in 9999");
})

