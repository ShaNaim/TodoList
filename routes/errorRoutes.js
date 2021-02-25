const { Router } = require("express");
const errController = require("../controllers/errController");
const router = Router();

router.get("*", errController.err404);

module.exports = router;
