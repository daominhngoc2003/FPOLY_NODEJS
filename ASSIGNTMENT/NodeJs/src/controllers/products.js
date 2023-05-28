import Product from "../models/products";
import productSchema from "../schemas/products";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Lấy sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id).populate({
      path: "categoryId",
      // select: "name",
    });
    if (!products) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Lấy sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const products = await Product.create(req.body);
    if (!products) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!products) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    if (!products) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
