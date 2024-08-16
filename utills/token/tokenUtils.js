const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwtConfig');

function generateToken(user){
    return jwt.sign({
        id: user.id,
    },
    jwtConfig.jwtSecret,
    {
        expiresIn : jwtConfig.jwtExpiresIn
    }
)
};

module.exports = {
    generateToken
}