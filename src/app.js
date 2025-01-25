
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
    const user = User(req.body)

try{
    await user.save();
    res.send("data send successfully..")
}
catch(error){
    console.error("This is our error Please fix it first : ", error.message);
}

})


// Get data from the database. For this we are using Get API methods....
app.get("/feed", async(req, res)=>{
        const user = await User.find({});
        try{
            console.log(user);
            res.send(user);
        }
        catch (err){
            res.status(401).send("Something went wrong!!");
        }

})


app.get("/user", async(req, res)=>{

    const user = await User.findOne({emailId: "Anshul@gmail.com"})

    try{
        
        res.send(user);
        console.log(user);
        
    }catch(err){
        res.status(401).send("Something went wrong!!");
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

