import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "14m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne();

    const newToken = new UserToken({ userId: user._id, token: refreshToken });
    await newToken.save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

export default generateTokens;
