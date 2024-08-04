const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "1h"}); // generate access token
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"}); // generate refresh token

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId}); // check if token exists
        if (tokenData) {
            tokenData.refreshToken = refreshToken; // if token exists
            return tokenData.save(); // save token in db
        }
        const token = await TokenModel.create({user: userId, refreshToken}); // if token doesn't exist
        return token; // create token in db
    }
}

module.exports = new TokenService()