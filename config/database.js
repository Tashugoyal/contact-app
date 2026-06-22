import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const contactDB=()=>{
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connnection established");
});
}

