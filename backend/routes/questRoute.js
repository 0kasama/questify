const router = require('express').Router();
const questController = require("../controllers/questController")

router.get("/", questController.findAll)
router.get("/:id", questController.findOne)
router.post("/", questController.create)
router.put("/:id", questController.update)
router.delete("/:id", questController.destroy)


module.exports = router