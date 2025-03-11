
const mongoose = require("mongoose");
const validator = require("validator");
// console.log(validator);

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



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


UserSchema.methods.getJWT = async function(){

    const user = this;

    const token = await jwt.sign({_id: user._id}, "HEY@0911" , {expiresIn: '1d'});

    return token;
}

UserSchema.methods.validatePassword = async function(passwordInputByuser) {
        const user = this;

        const passwordHash = user.password;

        const ispasswordValid = await bcrypt.compare(
            passwordInputByuser, 
            passwordHash
        );

        return ispasswordValid;
}


// Now make modle of user schema

UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
