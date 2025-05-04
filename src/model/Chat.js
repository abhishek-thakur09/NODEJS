
const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
},
    { timestamps: true },
)


const ChatSchema = new mongoose.Schema({
    participents: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
        },
    ],
    message: [MessageSchema],
},
    { timestamps: true },
)

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = { Chat };