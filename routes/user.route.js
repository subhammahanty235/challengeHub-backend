const express = require("express")

const router = express.Router();
const {createProfile} = require('../controllers/user.controller')
router.put('/profile/create' , createProfile)

module.exports = router