/**
 * Author: Kabilesh K
 * Created On: 28.02.2025
 * Modified On: 28.02.2025
 * Reviewed By: -
 * Description: Method which is used to give the api access for the specified user role.
 */
module.exports.authorize = (allowedRoles) => {
    return (req, res, next) => {
        // Check if the user has an allowed role
        console.log('test3')
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden. You don't have permission to access this resource." });
        }
        next(); // User is authorized, proceed to next middleware/controller
    }
};