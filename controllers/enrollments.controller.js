const Courses = require('../models').courses;
const Enrollments = require('../models').enrollments;
const { to, ReE, ReS } = require('../responseHandler');
const { SUCCESS, ERROR } = require('../constants/messages');
const mailService = require('../services/sendMail.service');
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to enrolled a course only by the student.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const enrollCourse = async (req, res) => {
    let err, course, user, send;
    const id = req.body.courseId;
    [err, course] = await to(Courses.findByPk(id));
    if (err) return ReE(req, res, err, 422);
    if (course === 0) return ReE(req, res, { message: ERROR.NO_COURSE }, 404);
    [err, user] = await to(Enrollments.create({ studentId: req.user.id, courseId: id }));
    if (err) return ReE(req, res, err, 422);
    [err, result] = await to(Courses.findOne({ where: { id: id } }));
    if (err) return ReE(req, res, err, 422);
    console.log('Result : ', result.dataValues.title);
    [err, send] = await to(mailService.mail(req, result.dataValues.title));
    if (err) return ReE(req, res, err, 422);
    return ReS(res, { data: result, message: SUCCESS.ENROLLED_COURSE }, 200);
}
module.exports.enrollCourse = enrollCourse;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to get all the course which are registered by the respective student.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const getEnrollCourse = async (req, res) => {
    let err, course;
    const id = req.user.id;
    console.log(id);
    [err, course] = await to(Enrollments.findAll({ where: { studentId: id } }));
    if (err) return ReE(req, res, err, 422);
    if (!course) return ReE(req, res, { message: ERROR.NO_COURSE }, 404);
    return ReS(res, { data: course }, 200);
}
module.exports.getEnrollCourse = getEnrollCourse;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to update a course  status only by instructor.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const updateEnroll = async (req, res) => {
    let err, up, en;
    const body = req.body;
    [err, en] = await to(Enrollments.findOne({ where: { studentId: body.studentId, courseId: body.courseId } }));
    if (err) return ReE(req, res, err, 422);
    if (en === 0) return ReE(req, res, { message: ERROR.NO_COURSE }, 404);
    [err, up] = await to(Enrollments.update({ status: body.status }, { where: { studentId: body.studentId, courseId: body.courseId } }));
    if (err) return ReE(req, res, err, 422);
    return ReS(res, { message: SUCCESS.UPDATE_ENROLL }, 200);
}
module.exports.updateEnroll = updateEnroll;
