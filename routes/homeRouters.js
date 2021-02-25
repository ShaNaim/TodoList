const { Router } = require("express");

//constrollers
const homeController = require("../controllers/homeController");

//Middleware

const router = Router();

router.get("/", homeController.homeView);
router.get("/home", homeController.homeView);
router.get("/todo", homeController.homeView);
router.get("/about", homeController.aboutView);

module.exports = router;
