const express = require("express");
const {
  createBootcamp,
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controllers/bootcamps");

//Bringing in other Routes for linking ids
const courseRouter = require("./courses");

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);
router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
