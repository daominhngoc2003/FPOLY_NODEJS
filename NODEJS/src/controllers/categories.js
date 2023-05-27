import Category from "../models/categories";
import categorySchema from "../schemas/category";

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "lấy dữ liệu thành công",
      categories,
    });
  } catch (error) {}
};

export const get = async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);
    if (!categories) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "lấy dữ liệu thành công",
      categories,
    });
  } catch (error) {}
};

export const create = async (req, res) => {
  try {
    const { error } = await categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const categories = await Category.create(req.body);
    if (!categories) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      categories,
    });
  } catch (error) {}
};

export const remove = async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    if (!categories) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công",
      categories,
    });
  } catch (error) {}
};

export const update = async (req, res) => {
  try {
    const { error } = await categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const categories = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!categories) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "lấy dữ liệu thành công",
      categories,
    });
  } catch (error) {}
};
