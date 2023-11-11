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
        type: Date , 
        default: function (){
            if(this.startDate && this.totalnoOfDays){
                let endDate = new Date(this.startDate);
                endDate.setDate(endDate.getDate() + this.totalnoOfDays);
                return endDate;
            }
        }
    },
    totalnoOfDays: {
        type: Number,
    },
    completedTotaldays:{
        type:Number,
        default:0
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
