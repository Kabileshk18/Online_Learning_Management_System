const Joi = require('joi');
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the course creation part.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const createSchema = Joi.object({
    title : Joi.string().min(1).max(50).required(),
    description : Joi.string().min(1).max(250).required()
});
module.exports.validateCreate = (req, res, next) => {
    const { error } = createSchema.validate(req.body, { stripUnknown: true }); // Strips extra fields
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the update part of course.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const updateParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});
const updateBodySchema = Joi.object({
    title : Joi.string().min(1).max(50),
    description : Joi.string().min(1).max(250)
});
module.exports.validateUpdate = (req, res, next) => {
    // Validate Params
    const { error: paramsError } = updateParamsSchema.validate(req.params, { stripUnknown: true });
    if (paramsError) return res.status(400).json({ error: paramsError.details[0].message });

    // Validate Body
    const { error: bodyError } = updateBodySchema.validate(req.body, { stripUnknown: true });
    if (bodyError) return res.status(400).json({ error: bodyError.details[0].message });
    next();
};
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the delete part of course.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const deleteParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});
module.exports.validateDelete = (req, res, next) => {
    const { error: paramsError } = deleteParamsSchema.validate(req.params, { stripUnknown: true });
    if (paramsError) return res.status(400).json({ error: paramsError.details[0].message });
    next();
}