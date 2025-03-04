const Joi = require('joi');
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the enrollment of course .
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const enrollSchema = Joi.object({
    courseId : Joi.number().integer().positive().required()
});
module.exports.validateEnrollment = (req, res, next) => {
    const { error } = enrollSchema.validate(req.body, {stripUnknown : true});
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the update of a course.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const updateSchema = Joi.object({
    studentId : Joi.number().integer().positive().required(),
    courseId : Joi.number().integer().positive().required(),
    status : Joi.string().required()
});
module.exports.validateUpdate = (req, res, next) => {
    const { error } = updateSchema.validate(req.body, {stripUnknown : true});
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};