const mongoose = require("mongoose");
const CUConnectionSchema = mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenges"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    startDate: {
        type: Date
    },
    expectedEnd: {
        type: Date
    },
    totalnoOfDays: {
        type: Number,
    },
    completedTotaldays:{
        type:Number,
    },
    DayWisecompletedOn: [
        {
            date: {
                type: Date,
            },
            dayNumber:{
                type:Number
            },
            status:{
                type:Boolean,
                default:false
            }

        }
    ],

    challengeStatus:{
        status:{
            type:Boolean,
            default:false
        },
        completedon:{
            type:Date
        }
    }


})

const CUConnection = mongoose.model("cu_connections" , CUConnectionSchema);

module.exports = CUConnection
