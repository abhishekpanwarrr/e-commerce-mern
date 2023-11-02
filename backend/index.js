import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/user.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// App initialization
const app = express();
dbConnection();

//using middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET on "/"
app.get("/", (req, res) => {
  res.json("Hello from e-commerce store");
});
app.use("/api/user", authRouter);

// MiddleWares
app.use(notFound);
app.use(errorHandler);

// App listening on port
app.listen(PORT, function () {
  console.log("Listen on port " + PORT);
});
