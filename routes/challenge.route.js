const express = require('express');

const router = express.Router();
const {findAllChallenges , findChallengesofUser , createChallenge} = require('../controllers/challengeController')

router.get('/getAll/:userId' ,findAllChallenges);
router.get('/getmyChallenges/:userId' , findChallengesofUser)
router.post('/create' ,createChallenge )

module.exports = router