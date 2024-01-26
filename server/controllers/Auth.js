const User = require("../model/User.js");
const userotp = require("../model/OTP");
const nodemailer = require("nodemailer");
const Contact = require('../model/contactSchema')

// Send OTP For Email Verification
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// user send otp
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }

    try {
        const presuer = await User.findOne({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);
            const existEmail = await userotp.findOne({ email: email });

            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: "Nayan Kamble",
                    to: email,
                    subject: "Sending Email For Otp Verification",
                    text: `OTP:- ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            } 
            else {
                const saveOtpData = new userotp({
                    email, otp: OTP
                });
                await saveOtpData.save();
                const mailOptions = {
                    from: "Nayan Kamble",
                    to: email,
                    subject: "Sending Email for OTP Verification",
                    text: `OTP:- ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};


exports.contactForm = async(req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;
    const newContact = new Contact({ firstName, lastName, email, subject, message });
  
    try {
      // Save to MongoDB
      await newContact.save();
      // Send email
      const mailOptions = {
        from: email,
        to: process.env.EMAIL, // replace with the host email address
        subject: `New Contact: ${subject}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
      };
      await transporter.sendMail(mailOptions);
  
      res.status(200).send('Message sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
}