
const express = require('express');

const app = express()


// app.get("/text", (req, res)=>{
//     res.send("hey this is text");
// })


// app.delete("/text", (req, res)=>{
//     res.send("hey this is api deleted test");
// })

// app.use("/text", (req, res)=>{
//     res.send("hey my name is abhishek")
// })

// app.patch("/text", (req, res)=>{
//     res.send("Our server is patch!!")
// })

app.use("/test", (req, res, next)=>{

    // res.send("this is my first responce!!");
    console.log("1");
    next();
},
(req, res, next)=>{
    // res.send("this is my 2nd res!!");
    console.log("2");
    next();
},
(req, res, next)=>{
    res.send("this is my 3rd res!!");
    console.log("3");
    next();
},
(req, res, next)=>{
    res.send("this is my 4th res!!");
    console.log("4");
    next();
}

)



app.listen(9999, ()=>{
    console.log("Our server is running successfully in 9999");
})

