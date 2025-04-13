
const express = require('express');
const ProfileRouter = express.Router();

const {validateupdateProfileData} =  require("../utils/validation");

const {userAuth}  = require("../middlewares/auth");



//PROFILE API
// cookie handling
ProfileRouter.get("/profile/view", userAuth, async(req, res)=>{

    try{
        const user = req.user;

        console.log(user);
        res.send(user);

    }
    catch (error) {
        res.status(400).send("Error : " + error.message);
    }

})

ProfileRouter.patch("/profile/update",userAuth, async(req, res)=>{
    try{
        if(!validateupdateProfileData(req)){
            throw new Error("invalid request");
        }

        const Loggedinuser = req.user;
        console.log(Loggedinuser);


        Object.keys(req.body).forEach((key)=> (Loggedinuser[key] = req.body[key] ))

        await Loggedinuser.save();

        console.log(Loggedinuser);
        res.send(`${Loggedinuser.firstName} your profile is updated..`);

    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }

})


ProfileRouter.patch("/forgottPass", async(req, res)=>{
    try{
        
    }catch(error){
        res.status(400).send("Error" + error.message);
    }
})

module.exports = ProfileRouter;
