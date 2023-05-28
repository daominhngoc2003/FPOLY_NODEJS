import joi from "joi";

const categorySchema = joi.object({
  _id: joi.string(),
  name: joi.string().required(),
  image: joi.string().required(),
  // products: joi.string().required(),
  __v: joi.number(),
  createdAt: joi.date(),
  updatedAt: joi.date(),
});

export default categorySchema;
