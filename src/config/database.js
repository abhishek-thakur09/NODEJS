
const mongoose = require("mongoose");

const connectdb = async ()=>{
    await mongoose.connect(
        "mongodb+srv://AbhishekThakur:aeBnxpyP8OqAKcq1@tectinder.mqx5x.mongodb.net/TechTinder"
        );    
};





module.exports = connectdb; 

// it is a bad way very first you have to make a connection with your dataase then you will listening the requests

// connectdb().then(()=>{
//     console.log("database connection is successfull!!");
// }).catch((err) =>{
//     console.error("database cannot be connected");
// });

