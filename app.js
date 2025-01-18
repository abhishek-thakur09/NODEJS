
const express = require('express');

const app = express()

app.use("/", (req, res, next)=>{
    console.log("successfully send..");
    res.send("request send by 1st route handler.")
    next();
})

app.get("/text", (req, res, next)=>{
    res.send("request send by 2nd route handler.");
    next();
},
(req, res, next)=>{
    res.send("request send by 3rd route handler.");
    next();
},
(req, res, next)=>{
    res.send("request send by 4th route handler.");
    next();
},
(req, res, next)=>{
    res.send("request send by 5th route handler.");
    // next();
}


)



app.listen(9999, ()=>{
    console.log("Our server is running successfully in 9999");
})

