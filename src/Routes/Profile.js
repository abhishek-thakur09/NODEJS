
const express = require('express');
const ProfileRouter = express.Router();

const {userAuth}  = require("../middlewares/auth");



//PROFILE API
// cookie handling
ProfileRouter.get("/profile", userAuth, async(req, res)=>{

    try{
        const user = req.user;

        console.log(user);
        res.send(user);

    }
    catch (error) {
        res.status(400).send("Error : " + error.message);
    }

})



module.exports = ProfileRouter;
