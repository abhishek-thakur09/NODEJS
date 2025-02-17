
const validator = require("validator")

const ValidationsignUp = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not Valid....");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not Valid...");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Valid....");
    }
}


module.exports = {
    ValidationsignUp,
};