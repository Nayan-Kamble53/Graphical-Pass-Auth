const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    subject: String,
    message: String,
  });
  
  module.exports = mongoose.model('Contact', ContactSchema);