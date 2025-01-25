
const express = require('express');
const connectdb = require("./config/database");
const User = require("./model/user")
const app = express();

// middleware to convert our input data into json
app.use(express.json());


app.post("/signup", async (req, res)=>{

// console.log(req.body);


    // const userobj = {
    //     firstName: "Palak",
    //     lastName: "Thakur",
    //     emailId : "Palak@gmail.com",
    //     Age : 20
    // }
    const user = new User(req.body)

try{
    await user.save();
    res.send("data send successfully..")
}
catch(error){
    console.error("This is our error Please fix it first : ", error.message);
}

})





connectdb().then(()=>{
    console.log("database connection is successfull!!");

    // in above line we connect our database  then we make our prepared to listening the requests....

    app.listen(9999, ()=>{
        console.log("Our server is running successfully in 9999");
    })
}).catch((err) =>{
    console.error("database cannot be connected");
});





// app.listen(9999, ()=>{
//     console.log("Our server is running successfully in 9999");
// })

