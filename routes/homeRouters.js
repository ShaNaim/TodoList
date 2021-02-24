const { Router } = require("express");

//constrollers
const homeController = require("../controllers/homeController");

//Middleware
const { requireAuth, isAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", homeController.homeView);
router.get("/home", homeController.homeView);
router.get("/todo", homeController.homeView);
router.get("/about", requireAuth, homeController.aboutView);

module.exports = router;
