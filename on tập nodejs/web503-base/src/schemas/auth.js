import Joi from "joi";

export const SigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const SignupSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
