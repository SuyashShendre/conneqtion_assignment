const express = require('express');
const { register, login, currentUser } = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//Register || POST
router.post("/register", register)

//Login || POST
router.post("/login", login)

//Current User || GET
router.get("/current-user", authMiddleware, currentUser)

module.exports = router
