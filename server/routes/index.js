const express = require("express");
const router = express.Router();
const User = require('../model/User'); 
const controllers = require("../controllers/Auth");
const userotp = require("../model/OTP");

router.post("/sendotp",controllers.userOtpSend);
router.post("/contact", controllers.contactForm);

router.post("/validate-otp", async(req, res) => {
  const {email, enteredOTP} = req.body;
  
  try {
    const userOTP = await userotp.findOne({email});

    if(userOTP && userOTP.otp === enteredOTP) {
      res.status(200).json({
        success: true,
        message: "OTP is valid"
      })
    }
    else {
      res.json({
        success: false,
        message: "OTP is invalid"
      })
    }
  } catch(error) {
    res.status(500).json({
      success: false, 
      message: "Server Error"
    })
  }
})

router.delete('/delete/:email', async (req, res) => {
  const emailToDelete = req.params.email;

  try {
    const deletedUser = await User.findOneAndDelete({ email: emailToDelete });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = (unsplash) => {
  router.use("/api/login", require("./login")(unsplash));
  router.use("/api/register", require("./register")(unsplash));
  return router;
};
