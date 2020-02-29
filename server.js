const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const connectdb = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectdb();

const app = express();

//BodyParser
app.use(express.json());

//Routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

//Middlewares
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
