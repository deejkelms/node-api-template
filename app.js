require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./db/connect");
const mainRouter = require("./routes/main");
const test = require("./routes/test");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// MIDDLEWARE
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

// ROUTES
app.use("/api/v1", mainRouter);
app.use("/api/v1", test);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8081;

// make sure we connect to the DB before spinning up the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port: ${port}...`));
  } catch (error) {
    console.log("Unable to connect to the Database", err);
  }
};

start();
