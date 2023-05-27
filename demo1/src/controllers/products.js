import axios from "axios";
import dotenv from "dotenv";
import joi from "joi";
import mongoose from "mongoose";
import Product from "../model/products";

dotenv.config();

const productChema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string(),
});

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    // const { data: products } = await axios.get(
    //   `${process.env.API_URL}/products`
    // );

    if (!products) {
      res.status(400).json({
        message: "Koong có sản phẩm nào",
      });
    }
    return res.json({
      message: "Lấy sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    if (!products) {
      res.status(400).json({
        message: "Koong có sản phẩm nào",
      });
    }
    return res.json({
      message: "Lấy sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!products) {
      res.status(400).json({
        message: "Koong có sản phẩm nào",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const remove = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);

    if (!products) {
      res.status(400).json({
        message: "Koong có sản phẩm nào",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const create = async (req, res) => {
  try {
    // if (error) {
    //   return res.status(400).json({
    //     message: error.details[0].message,
    //   });
    // }
    const products = await Product.create(req.body);

    if (!products) {
      res.status(400).json({
        message: "Koong có sản phẩm nào",
      });
    }
    return res.json({
      message: "thêm sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { getAll, get, create, remove, update };
