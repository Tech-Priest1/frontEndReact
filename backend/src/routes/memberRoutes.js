const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const authenticate = require('../middleware/authenticate');



router.post("/register", memberController.addMember); 
router.get("/", memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);

// Update the delete route to match /api/member/:id
router.delete("/:id", memberController.deleteMember); 
router.put("/:id", authenticate,memberController.updateMember); 

module.exports = router;
