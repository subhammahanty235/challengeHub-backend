const router = require("express").Router();
const {CheckInactiveUsers, getinaciveOrFailingUser} = require('../controllers/adminControllers')
router.get('/inactive' ,CheckInactiveUsers )   //logged in but not participated in any challenge

router.get("/gincfailing",getinaciveOrFailingUser );


module.exports = router