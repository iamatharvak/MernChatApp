const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("Error connecting due to ", error);
    process.exit();
  }
};

module.exports = connectDB;
