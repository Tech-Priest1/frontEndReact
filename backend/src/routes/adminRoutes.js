const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController"); 

router.post("/register", adminController.registerAdmin); 
router.post("/login", adminController.loginAdmin); 
router.get("/", adminController.getAllAdmins); 

router.put("/:id", adminController.updateAdmin); 
router.delete("/:id", adminController.deleteAdmin); 


module.exports = router;
