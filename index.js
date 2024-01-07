require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();

mongoose.connect(process.env.MONGODB_URI , 
    console.log("DB connected successfully")
);

app.use(cors())
app.use(express.json());


app.use("/api/auth" , require('./routes/auth.route'))
app.use('/api/user' , require('./routes/user.route'))
app.use('/api/challenge' , require('./routes/challenge.route'))

app.use('/api/admin' , require('./routes/adminroutes.routes'))


//temp
app.use("/api/email" , require("./emailSystem/sendtestEmail").router)

app.listen(5000 , ()=>{
    console.log("App is running")
})


