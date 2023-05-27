import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAll = async (req, res) => {
  try {
    const { data: products } = await axios.get(
      `${process.env.API_URL}/products`
    );
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

export const get = async (req, res) => {
  try {
    const { data: product } = await axios.get(
      `${process.env.API_URL}/products/${req.params.id}`
    );
    return res.json({
      message: "Lấy sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { data: products } = await axios.post(
      `${process.env.API_URL}/products`,
      req.body
    );
    return res.json({
      message: "Thêm sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { data: product } = await axios.put(
      `${process.env.API_URL}/products/${req.params.id}`,
      req.body
    );
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { data: product } = await axios.delete(
      `${process.env.API_URL}/products/${req.params.id}`
    );
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
