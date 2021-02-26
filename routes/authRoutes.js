const { Router } = require("express");
const authController = require("../controllers/authController");
const { requireAuth, requireGuest } = require("../middleware/authMiddleware");
const router = Router();

router.get("/signup", requireGuest, authController.signup);
router.post("/signup", authController.addUser);

router.get("/login", requireGuest, authController.login);
router.post("/login", authController.authincateUser);
router.get("/logout", requireAuth, authController.logout);

module.exports = router;
