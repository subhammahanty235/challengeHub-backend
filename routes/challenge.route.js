const express = require('express');

const router = express.Router();
const {findAllChallenges , findChallengesofUser , createChallenge, marktaskasDone} = require('../controllers/challengeController')

router.get('/getAll/:userId' ,findAllChallenges);
router.get('/getmyChallenges/:userId' , findChallengesofUser)
router.post('/create' ,createChallenge )
router.post('/markasdone/:cId/:userId' , marktaskasDone)
module.exports = router