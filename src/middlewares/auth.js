
const jwt = require("jsonwebtoken");
const User = require("../model/user");


const userAuth = async (req, res, next) => {
    try {   // READ the cookies
        const cookies = req.cookies;
        // Extract Token from cookie
        const { token } = cookies;

        if(!token){
            throw new Error("Token is not valid...")
        }

        // Varify the token 
        const decodedObje = await jwt.verify(token, "HEY@0911");

        const { _id } = decodedObje;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;

        // next will help us to move our request handler..
        next();
    }
    catch{
        res.status(404).send("Please enter valid credentials..");
    }

};


module.exports = {
    userAuth
};
