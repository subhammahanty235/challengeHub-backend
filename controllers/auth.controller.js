const TempOtp = require("../models/tempotp.model")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");


exports.generateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Please provide a email" })
        }

        //find if there's already one otp present for the email
        const checkIfOtpExists = await TempOtp.findOne({ email: email });
        if (checkIfOtpExists) {
            await TempOtp.deleteOne({ email: email })
        }

        const otp = Math.floor(10000 + Math.random() * 90000);
        console.log(otp)
        const to = await TempOtp.create({
            email: email,
            otp: otp,
            created: new Date(Date.now()),
            expiry: new Date(Date.now() + 2 * 60 * 1000)
        })
        return res.status(200).json({
            success: true,
            too: to,
            message: "OTP sent to your email",
            otp: otp,
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const data = await TempOtp.findOne({ email: email });
        
        if(!data){
            return res.status(400).json({ success: false, message: "Error occured" })
        
        }
        
        if (data.otp !== parseInt(otp)) {
            return res.status(200).json({ success: false, message: "Wrong OTP" })
        }

        if (data.expiry < new Date()) {
            
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        if (data.otp === parseInt(otp)) {
           
            //check if user already exists
            const user = await User.findOne({ emailId: email })
            await TempOtp.deleteOne({ email: email })
            if (user) {
                
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, "jwt67689797979");

                res.status(200).json({ success: true, token: token, user: user, message: "Logged in successfully" })
            } else {
                
                const user = await User.create({
                    emailId: email,
                    joined: new Date()
                })
                
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, "jwt67689797979");
                
                res.status(200).json({ success: true, token: token, user: user, message: "Logged in successfully" })


            }
        }else{
            res.status(400).json({ success: false, token: token, message: "Wrong OTP" })
        }


    } catch (error) {

    }
}

