import mongoose from "mongoose";
import { config } from "dotenv";

config();
export const connectdb = async () => {
  mongoose
    .connect(process.env.DB_LINK, {
      dbName: "Habatica",
    })
    .then(() => console.log("database connected!"))
    .catch((e) => console.log(e));
};
