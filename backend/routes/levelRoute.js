const router = require('express').Router();
const levelController = require("../controllers/levelController")

router.get("/", levelController.findAll)
router.get("/:id", levelController.findOne)


module.exports = router