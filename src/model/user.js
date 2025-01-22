
const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    firstName:{
        type: String
    },
    lastName : {
        type: String
    },
    emailId : {
        type: String
    },
    password : {
        type :  String
    },
    age : {
        type :  Number
    }
});

// Now make modle of user schema

UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
