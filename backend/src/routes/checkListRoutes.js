const express = require("express")
const router = express.Router()
const checklistController = require("../controllers/checklistController")

router.post("/", checklistController.creatChecklist)
router.post("/many" , checklistController.createManyChecklist)
router.get("/" ,checklistController.getAllChecklists)
router.put("/:id", checklistController.updateChecklist)
router.put("/:id", checklistController.deleteChecklist)
router.put("/agreggate/task", checklistController.getChecklistWithTaskCount)

module.exports = router;