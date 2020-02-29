const Bootcamp = require("../models/Bootcamp");

exports.createBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      message: "Created New Bootcamp",
      payload: [bootcamp]
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      message: "Gets all Bootcamps",
      payload: bootcamps
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.getBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    //If bootcamp isnt formated well or exists
    if (!bootcamp) {
      return res.status(400).json({
        success: false
      });
    }
    res.status(200).json({
      success: true,
      payload: bootcamp,
      message: `Get Bootcamp ${req.params.id}`
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.updateBootcamp = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.deleteBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false
      });
    }
    res.status(200).json({
      success: "Bootcamp successfully Deleted"
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};
