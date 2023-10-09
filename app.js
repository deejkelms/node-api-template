const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/connect");

const test = require("./routes/test");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// MIDDLEWARE
dotenv.config();
app.use(cors());
app.use(express.json());

// ROUTES
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
