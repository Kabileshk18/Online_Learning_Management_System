const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
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
    const templatePath = path.join(__dirname, "../public/template/mail.template.html");
    let emailTemplate = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders with actual values
    emailTemplate = emailTemplate
        .replace("{{studentName}}", req.user.firstName)
        .replace("{{courseName}}", co);

    // Setup email transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email_user,
            pass: process.env.email_pass,
        },
    });

    const mailOptions = {
        from: `"Online LMS" <${process.env.email_user}>`,
        to: req.user.email,
        subject: "Course Enrollment Confirmation",
        html: emailTemplate,
    };
    // Send email
    [err, info] = await to(transporter.sendMail(mailOptions));
    if (err) TE(err.message)
    return info.response
}
module.exports.mail = mail;
