
const express = require('express');
const { userAuth } = require("../middlewares/auth");
const {Chat} = require('../model/Chat');
const chatRouter = express.Router();


chatRouter.get('/chat/:target_id', userAuth, async(req, res)=>{

    const {target_id} = req.params;
    const userID = req.user._id;

    

   try{
    let chat =await Chat.findOne({
        participents: { $all: [userID, target_id] },
    }).populate({
        path:"message.senderId",
        select: "firstName lastName",
    });
        if(!chat){
            chat = new Chat({
                participents: [userID, target_id],
                message: [],
            });
            await chat.save();
        }
        res.json(chat);
   }
   catch(err){
    console.log(err);
   }
})



module.exports = chatRouter;