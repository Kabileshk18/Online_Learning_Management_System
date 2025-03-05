const Courses = require('../models').courses;
const { to, ReE, ReS } = require('../responseHandler');
const { SUCCESS, ERROR } = require('../constants/messages');
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to create a course only by instructor.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const createCourse = async(req, res) => {
    let err, course;
    const body = req.body;
    [err, course] = await to(Courses.create({ title:body.title, description:body.description, instructorId : req.user.id}));
    if(err) return ReE(req, res, err, 422);
    if(!course) return ReE(req, res, 500);
    return ReS(res, {data : course, message : SUCCESS.CREATE_COURSE }, 201);
}
module.exports.createCourse = createCourse;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to get all course available.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const getAllCourse = async(req, res) => {
    let err, course;
    [err, course] = await to(Courses.findAll());
    if(err) return ReE(req, res, err, 422);
    if(!course) return ReE(req, res, {message : ERROR.NO_COURSE },500);
    return ReS(res, {data : course}, 200);
}
module.exports.getAllCourse = getAllCourse;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to update a course only by respective course instructor.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const updateCourse = async(req, res) => {
    let err, co, course;
    const body = req.body;
    [err, co] = await to(Courses.findByPk(req.params.id));
    if(err) return ReE(req, res, err, 422);
    if(+req.params.id === co.id){
        if(co === 0) return ReE(req, res, {message : ERROR.NO_COURSE}, 404);
        [err, course] = await to(Courses.update(body, { where : { id : req.params.id}}));
        if(err) return ReE(req, res, err, 422);
        return ReS(res, {message : SUCCESS.UPDATE_COURSE}, 200);
    }
    else { return ReE(req, res, {message : ERROR.OWN_INSTRUCTOR}, 401); }
}
module.exports.updateCourse = updateCourse;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to delete a course only by admin.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const deleteCouse = async(req, res)=>{
    let err, co, course;
    [err, co] = await to(Courses.findByPk(req.params.id));
    if(err) return ReE(req, res, err, 422);
    if(co === 0) return ReE(req, res, {message : ERROR.NO_COURSE}, 404);
    [err, course] = await to(Courses.destroy({where : { id : req.params.id}}));
    if(err) return ReE(req, res, err, 422);
    return ReS(res, {message : SUCCESS.DELETE_COURSE},200);
}
module.exports.deleteCouse = deleteCouse;
