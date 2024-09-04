import bcrypt from "bcrypt";
import { validateBody, validateLoginBody } from "../utils/schemaValidation.js";
import User from "../models/User.js";
import generateTokens from "../utils/generateTokens.js";

const signup = async (req, res) => {
  const body = req.body;
  try {
    const { error } = validateBody(body);
    if (error) {
      console.log("Error", error);
      res.status(400).json({ error: true, message: error.details[0].message });
    }
    const user = await User.findOne({ email: body.email });
    if (user) {
      res.status(400).json({ error: true, message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ error: false, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, mesage: "Internal Server error" });
  }
};

const login = async (req, res) => {
  const body = req.body;
  const { error } = validateLoginBody();
  if (error) {
    console.log("Error", error);
    res.status(400).json({ error: true, message: error.details[0].message });
  }
  const user = await User.findOne({ email: body.email });
  if (!user) {
    res.status(400).json({ error: true, message: "Invalid email or password" });
  }
  const verifiedPassword = await bcrypt.compare(body.password, user.password);
  if (!verifiedPassword) {
    res.status(401).json({ error: true, message: "Invalid password" });
  }
  const { accessToken, refreshToken } = await generateTokens(user);
  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

export { signup, login };
