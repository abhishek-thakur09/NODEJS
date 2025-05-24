
const connectionrequest = require("../model/RequestConnection");
const User = require("../model/user");
const { userAuth } = require("../middlewares/auth");

const express = require('express');
const RequestRouter = express.Router();




// Get data from the database. For this we are using Get API methods....
RequestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const Status = req.params.status;

    // check weather the status request is allowedstatus OR not
    const allowedstatus = ["ignore", "interested"];

    if (!allowedstatus.includes(Status)) {
      return res.status(400).json({ message: "Invalid status type : " + Status });
    }

    // if there is any ConnectionRequest
    const existingConnectionRequest = await connectionrequest.findOne({
      $or: [{ fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
      ]
    })

    if (existingConnectionRequest) {
      return res.status(400).json({ message: "Connection Request already exist!!" });
    }

    // if Fromuser send request to himself 

    const toUser = await User.findById(toUserId)
    if (!toUser) {
      return res.status(400).json({ message: "User not found!!" });
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
      message: req.user.firstName + " is " + Status + " in " + toUser.firstName,
      data,
    });
  }
  catch (err) {
    res.status(400).send("error" + err);
  }
})


RequestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {

    const Loggedinuser = req.user;
    const { status, requestId } = req.params;


    const allowedstatus = ["accepted", "rejected"];

    if (!allowedstatus.includes(status)) {
      return res.status(404).json({
        message: "Status is not found!!",
      });
    }

    const connectionRequest = await connectionrequest.findOne({
      // _id: requestId,
      toUserId: Loggedinuser._id,
      Status: "interested",
    }); 
    console.log(Loggedinuser._id);
    console.log(connectionRequest);
    console.log(requestId);
    

    if (!connectionRequest) {
      return res.status(404).json({
        message: "User not Found Please try again!!",
      })
    }

    connectionRequest.Status = status;

    const data = await connectionRequest.save();

    res.json({
      message: status + "SUCCESSFULLY",
      data,
    });

  }
  catch (err) {
    res.status(400).send("error" + err);
  }

})

module.exports = RequestRouter;
