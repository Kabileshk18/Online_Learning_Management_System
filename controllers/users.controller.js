const Users = require('../models').users;
const { to, ReE, ReS } = require('../responseHandler')
const { SUCCESS, ERROR } = require('../constants/messages')
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to create a new user.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const register = async (req, res) => {
    let err, user;
    const body = req.body;
    [err, user] = await to(Users.findOne({ where: { email: body.email } }));
    if (user) return ReE(req, res, { message: ERROR.USER_FOUND }, 422);
    if (err) return ReE(req, res, err, 422);
    [err, user] = await to(Users.create(body));
    delete user.dataValues.password;
    if (err) ReE(req, res, err, 422);
    return ReS(res, { data: user, message: SUCCESS.CREATE_USER }, 200);
}
module.exports.register = register;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to login to the application.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const login = async (req, res) => {
    let err, user, token;
    const body = req.body;
    [err, user] = await to(Users.findOne({ where: { email: body.email } }));
    if (err) return ReE(req, res, err, 422);
    if (!user) return ReE(req, res, { message: ERROR.NO_USER }, 422);
    [err, result] = await to(user.comparePassword(body.password));
    if (err) return ReE(req, res, err, 422);
    [err, token] = await to(user.getToken(user));
    if (err) return ReE(req, res, err, 422);
    return ReS(res, { data: token, message: SUCCESS.USER_LOGIN }, 200)
}
module.exports.login = login;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to get all user only authorized to admin.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const getAllUser = async (req, res) => {
    let err, user;
    [err, user] = await to(Users.findAll());
    if (err) return ReE(req, res, err, 422);
    return ReS(res, { data: user }, 200);
}
module.exports.getAllUser = getAllUser;
/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to delete a user only authorized to admin.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const deleteUser = async (req, res) => {
    let err, user, del;
    const id = req.params.id;
    [err, user] = await to(Users.findByPk(id));
    if (err) return ReE(req, res, err, 422);
    if (!user) return ReE(req, res, { err: ERROR.NO_USER }, 404);
    [err, del] = await to(Users.destroy({ where: { id: +id } }));
    if (err) return ReE(req, res, err, 422);
    if (del === 0) return ReE(req, res, err, 422);
    return ReS(res, { message: SUCCESS.USER_DELETED }, 200);
}
module.exports.deleteUser = deleteUser;
