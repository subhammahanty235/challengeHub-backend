//it will include the controllers that are required from admin end. those controllers will not be directly implemented in the frontend application
const CUConnections = require('../models/challenge_user_connection.model')
const User = require('../models/user.model')
const Challenge = require('../models/challenge.model')
const { sendInactiveMail, sendNotParticipatinMail } = require('../emailSystem/sendtestEmail')
const { dayDifferenceCalculator } = require('../utils/dateHelpers')


exports.CheckInactiveUsers = async (req, res) => {     // this is for the users who logged in but not participated in any challenge
    try {
        const response = await User.aggregate([

            {
                $lookup: {
                    from: "cu_connections",
                    localField: "_id",
                    foreignField: "userId",
                    as: "challenges"
                }
            },
            {
                $match: {
                    challenges: { $size: 0 } // Filter users with no challenges
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    emailId: 1
                }
            }

        ])

        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                //for backend log tracking
                console.log("--------------------------------->")
                console.log("Sending inactive mail to")
                console.log(response[i].emailId)
                console.log("Date" + new Date());
                console.log("<---------------------------------")
                sendInactiveMail(response[i]);
            }
        }

        res.send(response)
    } catch (error) {

    }
}

exports.getinaciveOrFailingUser = async (req, res) => {
    const response = await CUConnections.aggregate([
        {
            $match: {
                challengeStatus: { $eq: { status: 0 } }  // Filter for status 0
            }
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
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $unwind:"$users"
        },
        // { $unwind: "$user" },  // Deconstruct the "user" array
        
        {
            $project: {
                // user:1,
                name:"$users.name",
                emailId:"$users.emailId",
                challengename:"$challenge.name",
                dwcData:"$DayWisecompletedOn",
                startDate: '$startDate',

            }
        }
    ]);


    

    const filteredData = response.filter((res)=> {
        const data = res.dwcData
        let lastdwc;
        if(data.length !==0){
            lastdwc =  data[data.length-1].date;
        }

      return  data.length !== 0 ? dayDifferenceCalculator(lastdwc) >= 3 && dayDifferenceCalculator(lastdwc) % 3 === 0  : dayDifferenceCalculator(res.startDate) >= 3 && dayDifferenceCalculator(res.startDate) % 3 === 0
    }
    );

    //send mail to the filtered users

    for(let i=0;i<filteredData.length;i++){
        const data = filteredData[i].dwcData

        let lastdwc;
        if(data.length !==0){
            lastdwc =  data[data.length-1].date;

        }
        console.log("--------------------------------->")
        console.log("Sending not participating mail to")
        console.log(response[i].emailId)
        console.log("Date" + new Date());
        console.log("<---------------------------------")

        sendNotParticipatinMail({
            name:filteredData[i].name,
            emailId:filteredData[i].emailId,
            challengeName:filteredData[i].challengename,
            totalInactiveDays:data.length !== 0 ? dayDifferenceCalculator(lastdwc) : dayDifferenceCalculator(filteredData[i].startDate)
        })
    }

    res.send(filteredData)
    // const fd = filteredData[2];

    // const data = fd.dwcData
    // if(data.length !== 0){
    //     res.send(data[data.length-1].date)

    // }else{
    //     res.send("Data not avaialable")
    // }
    




}