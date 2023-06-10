import express from "express";
import { config } from "dotenv";
import path from "path";
import { connectdb } from "./data/database.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middleware/error.js";
import cors from "cors"; //used for deploying backend server

//configuraing env variables
config({
  path: path.join(path.resolve(), "./data/config.env"),
});

//database connection
connectdb();

//express app
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

//error middleware
app.use(errorMiddleWare);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server started on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
