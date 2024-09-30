const express = require("express");
const router = express.Router();
const gymController = require("../controllers/gymController");

router.post("/", gymController.createGymType);
router.put("/:id", gymController.updateGymType);
router.delete("/:id", gymController.deleteGymType);

router.get("/", gymController.getAllGymTypes);
router.get("/:id", gymController.getGymTypeById);
router.get('/modalities/type/:id', gymController.getModalitiesByUserType);




module.exports = router;
