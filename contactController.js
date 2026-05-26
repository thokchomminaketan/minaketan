const Contact = require('../model/contactModel');
const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      text: message
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
};