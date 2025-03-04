const Joi = require("joi");
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the user registration.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const registerSchema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid("admin", "instructor", "student").required(),
});
module.exports.validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { stripUnknown: true }); // Strips extra fields
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the login part.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required()
});
module.exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { stripUnknown: true }); // Strips extra fields
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to validate the delete part.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const deleteSchema = Joi.object({
    id : Joi.number().integer().positive().required()
});
module.exports.validatedelete = (req, res, next) => {
    const { error } = deleteSchema.validate(req.params, { stripUnknown: true }); // Strips extra fields
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
