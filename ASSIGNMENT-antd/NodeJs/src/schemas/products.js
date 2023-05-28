import joi from "joi";

const productSchema = joi.object({
  _id: joi.string(),
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  image: joi.string(),
  categoryId: joi.string().required(),
  __v: joi.number(),
  createdAt: joi.date(),
  updatedAt: joi.date(),
});

export default productSchema;
