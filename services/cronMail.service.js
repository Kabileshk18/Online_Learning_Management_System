const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Users = require('../models').users;
const Enrollments = require('../models').enrollments;
const { to, TE } = require('../responseHandler');

require('../config/config')
/**
 * Author: Kabilesh K
 * Created On: 03.03.2025
 * Modified On: 03.03.2025
 * Reviewed By: -
 * Description: Method which is used to set an email configuration.
 */
const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., Gmail, Outlook, SMTP)
    auth: {
        user: CONFIG.email_user, // Your email
        pass: CONFIG.email_pass, // Your email password or App Password
    },
});
/**
 * Author: Kabilesh K
 * Created On: 03.03.2025
 * Modified On: 03.03.2025
 * Reviewed By: -
 * Description: Method which is used to send an email to the students who are all just enrolled their names in the course, yet not completed.
 */
const enrollCronMails = async () => {
    let err, enrolledStudents;
    [err, enrolledStudents] = await to(Enrollments.findAll({ where : { status : "enrolled" }, includes : [{model : Users, attributes : ["email", "firstName", "lastName"]}]}));
    if(err) TE(err);
    if(enrolledStudents === 0 ) return;
    // Send emails to each student
    for (const enrollment of enrolledStudents) {
        let err, info;
        const student = enrollment.Users;
        if (!student.email) continue;
        const mailOptions = {
            from: CONFIG.email_user,
            to: student.email,
            subject: "Reminder: Enrollment Status",
            text: `Hello ${student.firstName},\n\nYou are currently enrolled in your course. Keep learning!\n\nBest Regards,\nCourse Team`,
        };
        [err, info] = await to(transporter.sendMail(mailOptions));
        if(err) TE(err);
        console.log(`📩 Email sent to ${student.email}`);
    }
};
cron.schedule("0 17 * * 6", () => enrollCronMails());
module.exports.enrollCronMails = enrollCronMails;
