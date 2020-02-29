const Course = require("../models/Course");

exports.getAllCourses = async (req, res) => {
  let query;
  //Checks to see if the bootcampId exists
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  //Allows query to take over the logic
  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
};

exports.getCourse = async (req, res) => {
  const course = await (await Course.findById(req.params.id)).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "No course with that ID"
    });
  }

  res.status(200).json({
    success: true,
    data: course
  });
};
