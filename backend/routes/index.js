const router = require("express").Router();
const { authentication } = require("../middlewares/auth");

const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const questRoute = require("./questRoute");
const levelRoute = require("./levelRoute");

router.use("/api/auth", authRoute);

router.use(authentication);
router.use("/api/user", userRoute);
router.use("/api/quest", questRoute);
router.use("/api/level", levelRoute);

module.exports = router;
