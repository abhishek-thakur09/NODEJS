
const express = require("express");
const UserRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionrequest = require("../model/RequestConnection");
const User = require("../model/user");

UserRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log(req.user);


        const connectionRequest = await connectionrequest.find({
            toUserId: loggedInUser._id,
            Status: "interested",
        }).populate("fromUserId", "firstName lastName about skill");
        // }).populate("fromUserId", ["firstName" , "lastName"]);

        res.json({
            message: "data fetched successfully!!",
            data: connectionRequest,
        });
    }
    catch (err) {
        res.status(404).send(err);
    }

});


UserRouter.get("/user/connections", userAuth, async (req, res) => {

    try {

        const loggedInUser = req.user;

        const connectionRequest = await connectionrequest.find({
            $or: [
                { toUserId: loggedInUser._id, Status: "accepted", },
                { fromUserId: loggedInUser._id, Status: "accepted" }
            ]
        }).populate("fromUserId", "firstName lastName about skill")
            .populate("toUserId", "firstName lastName about skill");

        console.log(loggedInUser._id);

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });


        res.json({
            message: "data fetched successfully!!",
            data,
        })

    }
    catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
})

// Feed Api

UserRouter.get("/user/feed", userAuth, async (req, res) => {

    try {
        // User should see all the other cards
        // expect his own card,
        // expect whome he ignored,
        // expect Already send a request

        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;


        const connectionRequest = await connectionrequest.find({
            $or: [{ fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId");


        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });


        const users = await User.find({
            $and: [{ _id: { $nin: Array.from(hideUserFromFeed) } }, //nin -> not in this array
            { _id: { $ne: loggedInUser._id } },// ne -> not equal to this 
            ]
        }).select("firstName lastName skill age gender photoUrl about")
        .skip(skip)
        .limit(limit);


        res.send(users);

    }
    catch (err) {
        res.status(404).json({
            message: err,
        })
    }
})


module.exports = UserRouter;