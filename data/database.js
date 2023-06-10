import mongoose from "mongoose";
import { config } from "dotenv";

config();
export const connectdb = async () => {
  mongoose
    .connect(process.env.DB_LINK, {
      dbName: "Habatica",
    })
    .then((c) => console.log(`database connected with ${c.connection.host}!`))
    .catch((e) => console.log(e));
};
