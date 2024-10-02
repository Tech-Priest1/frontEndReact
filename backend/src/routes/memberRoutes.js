const express = require("express");
const router = express.Router();
const multer = require('multer');

const memberController = require("../controllers/memberController");
const authenticate = require('../middleware/authenticate');

//tentando salvar imagem T-T
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  const upload = multer({ storage });

router.post("/register", memberController.addMember);
router.post("/login", memberController.loginMember);  
router.get("/", memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);


router.delete("/:id", memberController.deleteMember); 
router.put("/:id", authenticate,memberController.updateMember); 
router.put('/:id/avatar', upload.single('avatar'), memberController.updateAvatar);
module.exports = router;
