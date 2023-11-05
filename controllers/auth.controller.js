const TempOtp = require("../models/tempotp.model")
const User = require("../models/user.model")

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
            too:to,
            message: "OTP sent to your email",
            otp: otp,
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}