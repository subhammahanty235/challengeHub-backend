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

        const otp = Math.floor(100000 + Math.random() * 900000);
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
        console.log(email)
        const data = await TempOtp.findOne({ email: email });
        console.log(data)
        if(!data){
            return res.status(400).json({ success: false, message: "Error occured" })
        
        }
        if (data.otp !== otp) {
            console.log("2")
            return res.status(200).json({ success: false, message: "Wrong OTP" })
        }

        if (data.expiry < new Date()) {
            console.log("3")
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        if (data.otp === otp) {
            console.log("4")
            //check if user already exists
            const user = await User.findOne({ email: email })
            await TempOtp.deleteOne({ email: email })
            if (user) {
                console.log("5")
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, "jwt67689797979");

                res.status(200).json({ success: true, token: token, user: user, message: "Logged in successfully" })
            } else {
                console.log("6")
                const user = await User.create({
                    emailId: email,
                    joined: new Date()
                })
                console.log(7)
                console.log(user)
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, "jwt67689797979");
                console.log("8")
                res.status(200).json({ success: true, token: token, user: user, message: "Logged in successfully" })


            }
        }


    } catch (error) {

    }
}