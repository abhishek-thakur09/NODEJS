
const mongoose = require("mongoose");

const validator = require("validator");
console.log(validator);


const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    emailId : {
        type: String,
        required: true,
        lowercase:true
    },
    password : {
        type :  String,
        // required: true
    },
    age : {
        type :  Number
    },
    skill : []
});

// Now make modle of user schema

UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
