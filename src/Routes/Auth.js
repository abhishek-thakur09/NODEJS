
const User = require("../model/user");
const bcrypt = require('bcrypt');
const { ValidationsignUp } = require("../utils/validation");
const validator = require("validator");


const express = require('express');
const AuthRouter = express.Router();



// signup 
AuthRouter.post("/signup", async (req, res) => {
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
        const {  firstName,
            lastName,
            emailId,
            password,
            gender,
            photoUrl,
            about,
            age,
            skill} = req.body;

        // const passwordHash = bcrypt.hash(password, 10).then(function (pass) {
        //     // console.log(pass);
        //     return pass;
        // });
        const passwordHash = bcrypt.hashSync(password, 10);

        
        // const user = new User(req.body)
        const user = new User({
            firstName, lastName, emailId, password: passwordHash, gender, photoUrl, about, age,skill
        })
        
       const savedUser =  await user.save();
       const token = await savedUser.getJWT();

        res.cookie('token', token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.json({message: "user added successfully! ", data: savedUser});
    }
    catch (error) {
        res.status(400).send("This is our error Please fix it first : " + error.message);
    }

})


// else Login
// LOGIN Api   small authantication ~
AuthRouter.post("/login", async(req, res)=>{

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

               res.status(200).send(user);
            }
            else{ 
                res.status(404).send("Invalid credentials..");
            }


    }  catch (error) {
        res.status(400).send("Error : " + error.message);
    }

})

// LOGOUT Api...

AuthRouter.post("/logout", async(req, res)=>{ 
        try{

             res.cookie("token", null, {expires: new Date(Date.now())});
             res.send("user Logout successfully...");

        }catch(error){
            res.status(400).send("Error" + error.message);
        }
})


module.exports = AuthRouter;