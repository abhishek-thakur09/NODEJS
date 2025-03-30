
const connectionrequest = require("../model/RequestConnection");
const User = require("../model/user");

const express = require('express');
const RequestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");


// Get data from the database. For this we are using Get API methods....
RequestRouter.post("/request/send/:Status/:toUserId", userAuth, async (req, res) => {
  try {

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const Status = req.params.Status;

    // check weather the status request is allowedstatus OR not
    const allowedstatus = ["ignore", "intersted"];

    if (!allowedstatus.includes(Status)) {
      return res.status(400).json({ message: "Invalid status type : " + Status });
    }

    // if there is any ConnectionRequest
    const existingConnectionRequest = await connectionrequest.findOne({
      $or:[{ fromUserId,toUserId},
        {fromUserId:toUserId , toUserId: fromUserId},
      ]
    })

    if(existingConnectionRequest){
     return  res.status(400).json({ message: "Connection Request already exist!!" });
    }

    // if Fromuser send request to himself 

    const toUser = await User.findById(toUserId)
    if(!toUser){
      return  res.status(400).json({ message: "User not found!!" });
    }

    // if sender ID is equal to receiver ID then 
    // WE CHECKED....
    // if(fromUserId == toUserId){
    //   return res.status(400).json({message: "Please try again...!"})
    // }

    const ConnectionRequest = new connectionrequest({
      fromUserId,
      toUserId,
      Status
    });
    const data = await ConnectionRequest.save();

    res.json({
      message: req.user.firstName + " is " + Status  + " in "+ toUser.firstName,
      data,
    });
  }
  catch (err) {
    res.status(400).send("error" + err);
  }
})


module.exports = RequestRouter;
