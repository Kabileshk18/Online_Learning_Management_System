const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
/**
 * Author: Kabilesh K
 * Created On: 24.02.2025
 * Modified On: 24.02.2025
 * Reviewed By: -
 * Description: Middleware which is used to verify the token from the header section.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
module.exports = (passport) => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        if (jwt_payload) {
            return done(null, jwt_payload);
        }
        else {
            return done(null, false);
        }
    }));
}