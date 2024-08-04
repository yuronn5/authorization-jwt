const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../service/mail-service");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email }); // check if user exists
    if (candidate) {
      throw new Error(`User with that email(${email}) already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // password hash
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    }); // create user in db
    await mailService.sendActivationMail(email, activationLink); // send email for activation

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto }); // accessToken, refreshToken
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // save refreshToken in db

    return { ...tokens, user: userDto }; 
  }
}

module.exports = new UserService();
