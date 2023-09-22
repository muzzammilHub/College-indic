const mongoose = require("mongoose");

// console.log(process.env.MONGO_URI);

exports.connectDatabase = ()=>{
    mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>{console.log("Database connected")})
        .catch((error)=>{console.log(error)})
}