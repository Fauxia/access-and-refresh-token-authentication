import { Router } from "express";
import { validateRefreshToken } from "../utils/schemaValidation.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import jwt from "jsonwebtoken";

export const refreshTokenRouter = Router();

refreshTokenRouter.post("/", async (req, res) => {
  const body = req.body;
  const { error } = validateRefreshToken(body);
  if (error) {
    res.status(400).json({ error: true, message: error.details[0].message });
  }
  try {
    const { token } = await verifyRefreshToken(body.refreshToken);
    const payload = { _id: token._id, roles: token.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Error", error);
    res.status(403).json(error);
  }
});
