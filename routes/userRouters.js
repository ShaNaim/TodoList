const { Router } = require("express");
const userController = require("../controllers/userController");
const requireAuth = require("../middleware/authMiddleware").requireAuth;

const router = Router();

router.get("/dashboard", requireAuth, userController.dashBoardView);

router.post("/todo", userController.submitTask);
module.exports = router;
