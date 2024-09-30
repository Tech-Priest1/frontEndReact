const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const authenticate = require('../middleware/authenticate');


router.post("/register", memberController.addMember);
router.post("/login", memberController.loginMember);  
router.get("/", memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);


router.delete("/:id", memberController.deleteMember); 
router.put("/:id", authenticate,memberController.updateMember); 

module.exports = router;
