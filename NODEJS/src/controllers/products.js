import dotenv from "dotenv";
import Product from "../models/products";
import Category from "../models/categories";
import { productSchema } from "../schemas/products";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.json({
      massage: "Lấy sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      massage: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    return res.json({
      massage: "Lấy sản phẩm chi tiết thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      massage: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const product = await Product.create(req.body);
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id },
    });
    if (!product) {
      return res.json({
        message: "Thêm sản phẩm không thành công",
      });
    }
    return res.json({
      massage: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      massage: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({
      massage: "Cập nhật sản phẩm chi tiết thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      massage: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      massage: "Xóa sản phẩm chi tiết thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      massage: error,
    });
  }
};
