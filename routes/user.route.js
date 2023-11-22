const express = require("express")
const {verifyToken} = require('../middlewares/verifyToken')
const router = express.Router();
const {createProfile} = require('../controllers/user.controller')

router.put('/profile/create' ,verifyToken, createProfile)

module.exports = router