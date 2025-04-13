
const mongoose = require("mongoose");
const validator = require("validator");
// console.log(validator);

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength:4,
        maxLength:30,
    },
    lastName : {
        type: String,
    },
    emailId : {
        type: String,
        lowercase:true,
        required: true,
        unique: true,
        // trim: true,
        // validate: (val)=>{
        //     if(!validator.isEmail(val)){
        //         throw new Error("Email is not valid..");
        //     }
        // },
    },
    password : {
        type :  String,
        required:true,
        // validate(val){
        //     if(!validator.isStrongPassword(val)){
        //         throw new Error("Choose a strong password...");
        //     }
        // },
    },
    age : {
        type :  Number,
        min :18,
    },
        gender: {
            type: String,
            enum: {
                values: ["male", "female", "others"],
                message: `{VALUE} is incorrect status type`,
            },
        },
    photoUrl:{
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        // validate(value) {
        //     if (!validator.isURL(value)) {
        //       throw new Error("Invalid Photo URL: " + value);
        //     }
        //   },
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skill :{ 
        type: [String],
    },
},
{
    timestamps: true,
});

// Compound index on firstName and LastName
// UserSchema.index({firstName:1, lastName: 1});

UserSchema.methods.getJWT = async function(){

    const user = this;

    const token = await jwt.sign({_id: user._id}, "HEY@0911" , {expiresIn: '3d'});

    return token;
};

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
// And how to export a model of our schema.

UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
