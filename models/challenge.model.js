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
        default:0
    },
    created:{
        type:Date
    },
    totalCrowd:{
        type:Number,
        default:1
    },
    visibility:{
        type:String,
        enum:{
            values:['Private' , 'Public' , 'Protected'],
            message:'{ VALUE } is not supported'
        },
        default:'Public'
    },
    rating:{
        type:Number,
        default:0.0
    },
    totalCompleted:{        //total crowd who has completed the challenge
        type:Number,
        default:0
    },
    
})

const Challenge = mongoose.model('challenges' , ChallengeSchema);
module.exports = Challenge