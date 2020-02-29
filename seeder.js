const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Loads Environment
dotenv.config({ path: "./config/config.env" });

//Loads Models
const Bootcamp = require("./models/Bootcamp");
const Courses = require("./models/Course");

//Connection To Database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//Add data to the Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Courses.create(courses);
    console.log("Data Imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete data from the Database
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Courses.deleteMany();
    console.log("Data Deleted...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
