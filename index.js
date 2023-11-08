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

app.listen(5000 , ()=>{
    console.log("App is running")
})


