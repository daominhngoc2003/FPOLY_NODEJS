import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string(),
});
