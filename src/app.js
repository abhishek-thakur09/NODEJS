
const express = require('express');
const connectdb = require("./config/database");
const User = require("./model/user")
const app = express();
const bcrypt = require('bcrypt');
const { ValidationsignUp } = require("./utils/validation");


// middleware to convert our input data into json
app.use(express.json());


app.post("/signup", async (req, res) => {
    // Never trust on req.body

    // Validation of data should be necessary 


    // console.log(req.body);


    // const userobj = {
    //     firstName: "Palak",
    //     lastName: "Thakur",
    //     emailId : "Palak@gmail.com",
    //     Age : 20
    // }

    try {
        // console.log(req.body.password);

        // 1. validation of user
        ValidationsignUp(req);

        // 2. Encrypt our password.
        const {firstName, lastName, emailId, password} = req.body;

        // const passwordHash = bcrypt.hash(password, 10).then(function (pass) {
        //     // console.log(pass);
        //     return pass;
        // });
        const passwordHash = bcrypt.hashSync(password, 10);

        
        // const user = new User(req.body)
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })



        
        await user.save();
        res.send("data send successfully..")
    }
    catch (error) {
        res.status(400).send("This is our error Please fix it first : " + error.message);
    }

})


// Get data from the database. For this we are using Get API methods....
app.get("/feed", async (req, res) => {
    const user = await User.find({});
    try {
        console.log(user);
        res.send(user);
    }
    catch (err) {
        res.status(401).send("Something went wrong!!");
    }

})


app.get("/user", async (req, res) => {

    const user = await User.findOne({ emailId: "Anshul@gmail.com" })

    try {

        res.send(user);
        console.log(user);

    } catch (err) {
        res.status(401).send("Something went wrong!!");
    }

})

// Delete data from database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    // for delete the user from the database...
    const user = await User.findByIdAndDelete(userId);

    try {
        res.send("data deleted successfully...!");
        console.log(user);


    } catch (err) {
        res.status(401).send("Something went wrong!!");
    }

})

app.patch("/user/:userId", async (req, res) => {

    const userid = req.params?.userId;
    const data = req.body;


    try {

        // Api level validation..
        const Allowed_Updates = ["Age", "skill"];
        const IsUpdate = Object.keys(data).every((k) => Allowed_Updates.includes(k));

        if (!IsUpdate) {
            throw new Error("Failed to Update..");
        }

        if (data?.skill.length > 5) {
            throw new Error("Skill must be in Limit..");
        }


        const user = await User.findByIdAndUpdate({ _id: userid }, data, { returnDocument: "after" });
        console.log(user);
        res.send("data updated successfully!!");

    } catch (err) {
        res.status(401).send("something went wrong..");
    }

})







connectdb().then(() => {
    console.log("database connection is successfull!!");

    // in above line we connect our database  then we make our prepared to listening the requests....

    app.listen(9999, () => {
        console.log("Our server is running successfully in 9999");
    })
}).catch((err) => {
    console.error("database cannot be connected");
});





// app.listen(9999, ()=>{
//     console.log("Our server is running successfully in 9999");
// })

