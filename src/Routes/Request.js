
const express = require('express');
const RequestRouter = express.Router();

const {userAuth}  = require("../middlewares/auth");


// Get data from the database. For this we are using Get API methods....
RequestRouter.post("/sendConnectionRequest",userAuth, async (req, res)=>{
    const user = req.user;
    res.send(user.firstName + " send request successfully..");
})


module.exports = RequestRouter;
