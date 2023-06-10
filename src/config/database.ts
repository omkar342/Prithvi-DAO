import mongoose, { ConnectOptions } from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_URI, "url");

// const mongoDBURL : string = process.env.MONGODB_URI || "mongodb+srv://omkar342:fNC2uPdBPgw8mRDg@video-repo.wgzzxg4.mongodb.net/test";

const mongoDBURI: string = process.env.MONGODB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log(colors.green("Connected successfully to MongoDB").underline);
  } catch (e) {
    console.log(colors.red.bold(`Error is ${e}`));
    process.exit();
  }
};

export default connectDB;
