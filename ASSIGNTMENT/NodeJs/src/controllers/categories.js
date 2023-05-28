import Category from "../models/categories";
import categorySchema from "../schemas/categories";
import Product from "../models/products";

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find({}).populate({
      path: "products",
    });
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Lấy danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    const products = await Product.find({ categoryId: req.params.id });
    return res.json({
      message: "Lấy danh mục thành công",
      category: { ...category.toObject(), products },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const categories = await Category.create(req.body);
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const categories = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Cập nhật danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Xóa danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
