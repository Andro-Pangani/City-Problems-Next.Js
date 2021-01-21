const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

const alternativeTools = require("../functions/alternative-tools");
const content_uploading_tools = require("../functions/content_uploading-tools");

router.route("/main").get(controllers.main);
router.route("/getSingleCase").get(controllers.getSingleCase);

router.route("/delete").post(controllers.delete_case);
router.route("/aqi").get(controllers.aqi);

router.route("/approove").post(controllers.case_approove);

router
  .route("/file/upload")
  .post(
    content_uploading_tools.multerMiddleware,
    content_uploading_tools.minimize,
    content_uploading_tools.minimizeVideo,
    controllers.content_uploading
  );

router
  .route("/alternative/singleApproove")
  .post(controllers.alternativeSingleApproove);

router
  .route("/alternative/upload")
  .post(
    alternativeTools.multerMiddleware,
    alternativeTools.minimize,
    controllers.alternativeUpload
  );

router
  .route("/alternative/singleDelete")
  .post(controllers.alternativeSingleDelete);

router.route("/login").get(controllers.authentication);

router.param("id", (req, res, next, parameter) => {
  console.log("ROUTER PARAM IS param Middleware - ", parameter);
  res.json({
    massage: "from router.param()",
    params: parameter,
  });
});

router.route("/api").get((req, res, next) => {
  console.log("Params from /api ", req.params);
  res.json({
    massage: "Api route",
    params: req.params,
  });
});

router.route("/api/users/:id").get((req, res) => {
  console.log("########## WELCOME TO API USERS");

  res.json({
    massage: "WELCOME TO USERS ROUTE",
  });
});

module.exports = router;
