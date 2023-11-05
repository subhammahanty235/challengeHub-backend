const express = require("express")
const router = express.Router()
const {generateOtp , verifyOtp} = require("../controllers/auth.controller")


router.post("/generateotp" , generateOtp)
router.post("/verifyotp" , verifyOtp)

module.exports = router