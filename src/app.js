
const express = require('express');
const connectdb = require("./config/database");
const User = require("./model/user");
const app = express();
const bcrypt = require('bcrypt');
const validator = require("validator");
const { ValidationsignUp } = require("./utils/validation");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const {userAuth}  = require("./middlewares/auth");


// middleware to convert our input data into json
app.use(express.json());
app.use(cookieParser());




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


// LOGIN Api   small authantication ~
app.post("/login", async(req, res)=>{

    try{
            const {emailId, password} = req.body;

            if(!validator.isEmail(emailId)){
                res.status(404).send("Invalid credentials..");
            }

            const user = await User.findOne({emailId});
            if(!user){
                res.status(404).send("Invalid credentials..");
            }

            const isValidUser = await user.validatePassword(password);

            if(isValidUser){
                // Create a JWT token  && also expiration of token
                const token = await user.getJWT();
                console.log(token);
                
                // add a token to cookie and response the cookie back to the user...  send the cookie! && also expiration of token
                res.cookie("token", token , { expires: new Date(Date.now() + 8 * 3600000) });

               res.status(200).send("Login successfully..");
            }
            else{
                res.status(404).send("Invalid credentials..");
            }


    }  catch (error) {
        res.status(400).send("Error : " + error.message);
    }

})


//PROFILE API
// cookie handling
app.get("/profile", userAuth, async(req, res)=>{

    try{
        const user = req.user;

        console.log(user);
        res.send(user);

    }
    catch (error) {
        res.status(400).send("Error : " + error.message);
    }

})



// Get data from the database. For this we are using Get API methods....
app.post("/sendConnectionRequest",userAuth, async (req, res)=>{
    const user = req.user;
    res.send(user.firstName + " send request successfully..");
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

