const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGOURL)
    .then(()=> {
         console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err.message);
    })