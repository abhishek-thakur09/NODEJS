
const mongoose = require('mongoose');


const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", //Reference to the user collection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", //Reference to the user collection
        required: true,
    },
    Status: {
        type: String,
        required: true,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },

    },

},
    { timestamps: true },
)

// putting Compound indexes on userIds
ConnectionRequestSchema.index({fromUserId: 1, toUserId: 1});


ConnectionRequestSchema.pre("save", function(next){

        const connectionRequest = this;

        // if the sender and receiver both are same then
       if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("Cannot send connection request to yourself..!")
       }

       next();
})



const ConnectionRequestModel = new mongoose.model("connectionrequest", ConnectionRequestSchema);

module.exports = ConnectionRequestModel;
