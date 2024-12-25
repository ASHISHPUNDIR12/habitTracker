import mongoose from "mongoose";
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Sucessfully Connected To MonogDB");
  } catch (error) {
    console.log("Error To Connect MongoDb & Error is", error.message);
  }
};

export default connectMongoDB;
