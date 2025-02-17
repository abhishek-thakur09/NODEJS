
const mongoose = require("mongoose");

const validator = require("validator");
// console.log(validator);


const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    emailId : {
        type: String,
        required: true,
        lowercase:true
        // validate: (val)=>{
        //     if(!validator.isEmail(val)){
        //         throw new Error("Email is not valid..");
        //     }
        // }
    },
    password : {
        type :  String,
        required:true
        // validate : (val)=>{
        //     if(!validator.isStrongPassword(val)){
        //         throw new Error("Choose a strong password...");
        //     }
        // }

    },
    age : {
        type :  Number
    },
    skill : []
});

// Now make modle of user schema

UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
