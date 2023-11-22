const express = require('express');

const router = express.Router();
const {findAllChallenges , findChallengesofUser , createChallenge, marktaskasDone, joinChallenge} = require('../controllers/challengeController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/getAll' ,verifyToken, findAllChallenges);
router.get('/getmyChallenges' ,verifyToken, findChallengesofUser)
router.post('/create' ,verifyToken, createChallenge )
router.post('/markasdone/:cId' ,verifyToken, marktaskasDone)
router.post('/join' , verifyToken , joinChallenge)
module.exports = router