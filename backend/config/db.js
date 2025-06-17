const mongoose = require("mongoose")
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected");
        
    } catch(err){
        console.error("Failed",err)
        process.exit(1)
    }
}
module.exports= connectDB