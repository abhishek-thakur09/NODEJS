
const express = require("express");
const UserRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const connectionrequest = require("../model/RequestConnection");

UserRouter.get("/user/requests/received", userAuth , async(req, res) => {
    try{
        const loggedInUser = req.user;
        console.log(req.user);


        const connectionRequest = await connectionrequest.find({
            toUserId: loggedInUser._id,
            Status: "interested",
        }).populate("fromUserId", "firstName lastName about skill");
    // }).populate("fromUserId", ["firstName" , "lastName"]);

        res.json({
            message:"data fetched successfully!!",
            data: connectionRequest,
        });
    }
    catch(err){
        res.status(404).send(err);
    }

});


UserRouter.get("/user/connections", userAuth, async(req, res)=>{

    try{

        const loggedInUser = req.user;

        const connectionRequest = await connectionrequest.find({
          $or: [
            {toUserId: loggedInUser._id, Status: "accepted",},
            {fromUserId: loggedInUser._id , Status: "accepted"}
          ]
        }).populate("fromUserId", "firstName lastName about skill")
        .populate("toUserId", "firstName lastName about skill");

console.log(loggedInUser._id);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
             return row.toUserId;
            }
            return row.fromUserId;
    });


        res.json({
            message: "data fetched successfully!!",
            data,
        })

    }
    catch(err){
        res.status(404).json({
            message: err.message,
        })
    }
})

module.exports = UserRouter;