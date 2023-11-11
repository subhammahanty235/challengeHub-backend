const express = require('express');

const router = express.Router();
const {findAllChallenges , findChallengesofUser , createChallenge} = require('../controllers/challengeController')

router.get('/getAll/:userId' ,findChallengesofUser );
router.get('/getAll' , findAllChallenges)
router.post('/create' ,createChallenge )

module.exports = router