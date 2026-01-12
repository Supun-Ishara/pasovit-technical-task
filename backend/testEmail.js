const nodemailer = require("nodemailer");
require('dotenv').config();

async function testEmail() {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MP,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✓ Server is ready to send emails");

    // Send test email
    let info = await transporter.sendMail({
      from: '"Clothing Store" <' + process.env.MAIL_ID + '>',
      to: process.env.MAIL_ID, // Send to yourself
      subject: "Test Email - Clothing Store",
      text: "This is a test email",
      html: "<b>This is a test email from your Clothing Store app!</b>",
    });

    console.log("✓ Message sent: %s", info.messageId);
    console.log("✓ Email sent successfully!");
  } catch (error) {
    console.error("✗ Error:", error.message);
  }
}

testEmail();