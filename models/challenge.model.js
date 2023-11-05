const mongoose = require("mongoose")

const ChallengeSchema = mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
        type:String
    },
    description:{
        type:String,
    },
    noOfdays:{
        type:Number,
    },
    created:{
        type:Date
    },
    totalCrowd:{
        type:Number
    },
    rating:{
        type:Number
    },
    totalCompleted:{        //total crowd who has completed the challenge
        type:Number
    },
    
})

const Challenge = mongoose.model('challenges' , ChallengeSchema);
module.exports = Challenge