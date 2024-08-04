const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    }); // generate access token
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    }); // generate refresh token

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId }); // check if token exists
    if (tokenData) {
      tokenData.refreshToken = refreshToken; // if token exists
      return tokenData.save(); // save token in db
    }
    const token = await TokenModel.create({ user: userId, refreshToken }); // if token doesn't exist
    return token; // create token in db
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken }); // delete token from db
    return tokenData; // return token
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken }); // check if token exists
    return tokenData;
  }
}

module.exports = new TokenService();
