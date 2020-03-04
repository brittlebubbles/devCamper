const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/asyncHandler");

exports.createBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    message: "Created New Bootcamp",
    payload: [bootcamp]
  });
});

exports.getBootcamps = asyncHandler(async (req, res) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    message: "Gets all Bootcamps",
    payload: bootcamps
  });
});

exports.getBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  //If bootcamp isnt formated well or exists
  if (!bootcamp) {
    throw new errorHandler("Bootcamp not found", 404);
  }
  res.status(200).json({
    success: true,
    payload: bootcamp,
    message: `Get Bootcamp ${req.params.id}`
  });
});

exports.updateBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return res.status(400).json({
      success: false
    });
  }
  res.status(200).json({
    success: true,
    payload: bootcamp
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({
      success: false
    });
  }
  res.status(200).json({
    success: "Bootcamp successfully Deleted"
  });
});
