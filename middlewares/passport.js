const passport = require('passport');
const {Strategy,ExtractJwt} = require('passport-jwt');
const jwtConfig = require('../config/jwtConfig');
const db = require("../config/db");

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : jwtConfig.jwtSecret
}

passport.use( new Strategy(opts,(jwt_payload,next) => {
    db.User.findByPk(jwt_payload.id)
    .then(user => {
        if(user)
        {
            return next(null,user);
        }
        else
        {
            return next(null,false);
        }
    })
    .catch(err => next(err,false));
})
);

module.exports = passport;