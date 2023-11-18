const express = require('express');

const router = express.Router();
const {findAllChallenges , findChallengesofUser , createChallenge, marktaskasDone} = require('../controllers/challengeController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/getAll/:userId' ,findAllChallenges);
router.get('/getmyChallenges/:userId' , findChallengesofUser)
router.post('/create' ,createChallenge )
router.post('/markasdone/:cId' ,verifyToken, marktaskasDone)
module.exports = router