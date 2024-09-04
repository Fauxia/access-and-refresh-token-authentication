import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const verifyRefreshToken = async (refreshToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const payload = jwt.verify(refreshToken, privateKey);
    console.log(payload);
    const token = await UserToken.findOne({
      userId: payload._id,
      token: refreshToken,
    });
    if (!token) {
      return Promise.reject({ error: true, message: "Invalid refresh" });
    }
    return { token };
  } catch (error) {
    return Promise.reject({ error: true, message: "Invalid refresh Token" });
  }
};

export default verifyRefreshToken;
