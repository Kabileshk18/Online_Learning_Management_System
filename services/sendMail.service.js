const nodemailer = require('nodemailer');
const { to, TE } = require('../responseHandler');
require('../config/config')

/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to set an email configuration.
 */
const mail = async (req, co) => {
    // Create transporter
    let err, info;
    let transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service (e.g., Gmail, Outlook, SMTP)
        auth: {
            user: CONFIG.email_user, // Your email
            pass: CONFIG.email_pass, // Your email password or App Password
        },
    });
    // Mail options
    let mailOptions = {
        from: CONFIG.email_user, // Sender address
        to: req.user.email, // Receiver email
        subject: 'Course Enrollment', // Email subject
        text: `You have been enrolled ${co}`, // Email body (plain text)
    };
    // Send email
    [err, info] = await to(transporter.sendMail(mailOptions));
    if (err) TE(err.message)
    return info.response
}
module.exports.mail = mail;
