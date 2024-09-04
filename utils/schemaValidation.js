import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const validateBody = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(body);
};

const validateLoginBody = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};

const validateRefreshToken = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token"),
  });
  return schema.validate(body);
};

export { validateBody, validateLoginBody, validateRefreshToken };
