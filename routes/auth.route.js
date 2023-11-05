const express = require("express")
const router = express.Router()
const {generateOtp} = require("../controllers/auth.controller")

router.post("/generateotp" , generateOtp)

module.exports = router