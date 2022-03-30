const router = require("express").Router();

const { getPrivateRoute } = require("../controllers/private");

const { protect } = require("../middlewares/auth");

router.route("/").post(protect, getPrivateRoute);

module.exports = router;
