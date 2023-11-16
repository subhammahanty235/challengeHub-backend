const { default: mongoose } = require('mongoose');
const Challenge = require('../models/challenge.model')
const UCConnection = require('../models/challenge_user_connection.model')

exports.createChallenge = async (req, res) => {
    try {
        const { challengeData, createdBy } = req.body;
        console.log(challengeData)
        if (challengeData.name === '') {
            return res.status(400).json({ success: false, message: "Please provide a name" })
        }

        const tempData = {
            name: challengeData.name,
            description: challengeData.description !== null ? challengeData.description : '',
            noOfdays: challengeData.noOfdays !== null ? challengeData.noOfdays : 1,
            created: Date.now(),
            visibility: challengeData.visibility,
            creator: createdBy
        }

        const result = await Challenge.create(tempData);

        if (result) {
            //store the challenge in user challenge connection model also
            await UCConnection.create({
                challengeId: result.id,
                userId: createdBy,
                startDate: Date.now(),
                totalnoOfDays: result.noOfdays,
            })

            res.status(200).json({ success: true, message: 'Challenge created successfully' })
        } else {
            res.status(400).json({ success: false, message: "Can't create the challenge" })
        }



    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.findAllChallenges = async (req, res) => {
    try {
        //it will only fetch the public and protected challenges,
        const userId = req.params.userId
        
        // const challenges = await Challenge.find({ visibility: { $ne: 'Private' } })
        const challenges = await Challenge.aggregate([
            {
                $match: {
                    visibility: {$ne: 'Private'}
                },

            },
            {
                $lookup:{
                    from:'cu_connections',
                    localField:'_id',
                    foreignField:'challengeId',
                    as: 'connections'
                }
            },
            {
                $match:{
                    'connections.userId':{$ne: mongoose.Types.ObjectId.createFromHexString(userId)}
                }
            },
            {
                $project:{
                    connections:0
                }
            }
        ])

        if (challenges) {
            return res.status(200).json({ success: true, challenges: challenges, message: 'Challenges Fetched Successfully' })
        } else {
            res.status(400).json({ success: false, message: "Can't fetch the challenge" })
        }


    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

exports.findChallengesofUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await UCConnection.aggregate([
            {
                $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) }
            },
            {
                $lookup: {
                    from: 'challenges',
                    localField: 'challengeId',
                    foreignField: '_id',
                    as: 'challenge'
                }
            },
            {
                $unwind: '$challenge'
            },
            {
                $project: {
                    _id: 0,
                    challenge: 1,
                    challengeStatus: '$challengeStatus',
                    completedTotaldays: '$completedTotaldays',
                    DayWisecompletedOn:'$DayWisecompletedOn',
                    expectedEnd:'$expectedEnd',
                    startDate:'$startDate'
                }
            }
        ])

        const challenges = result.map((item) => {
            const challengeData = item.challenge;
            challengeData.challengeStatus = item.challengeStatus;
            challengeData.completedTotaldays = item.completedTotaldays;
            challengeData.DayWisecompletedOn = item.DayWisecompletedOn;
            challengeData.expectedEnd = item.expectedEnd;
            challengeData.startDate = item.startDate;
            return challengeData;
        });
        res.status(200).json({ success: true, challenges: challenges, message: "Challenges fetched successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}