import Product from "../model/product";
import { productSchema } from "../schemas/product";

export const getAll = async (req, res) => {
  const {
    _limit = 20,
    _order = "asc",
    _sort = "createdAt",
    _keywords = "",
  } = req.query;
  const option = {
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    keywords: _keywords,
  };
  try {
    const searchdata = (products) => {
      return products?.docs?.filter((items) => {
        items.name.toLowerCase().includes(_keywords);
      });
    };
    const products = await Product.paginate({}, option);
    if (!products) {
      return res.status(400).json({
        message: "k có sp nào",
      });
    }
    const searchDatapro = await searchdata(products);
    const productResponse = { ...products, docs: searchDatapro };
    return res.status(200).json({
      message: "Láy succes",
      productResponse,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) {
      return res.status(400).json({
        message: "k có sp nào",
      });
    }
    return res.status(200).json({
      message: "Láy succes",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = await productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const products = await Product.create(req.body);
    if (!products) {
      return res.status(400).json({
        message: "k có sp nào",
      });
    }
    return res.status(200).json({
      message: "Add succes",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = await productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!products) {
      return res.status(400).json({
        message: "k có sp nào",
      });
    }
    return res.status(200).json({
      message: "Update succes",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    if (!products) {
      return res.status(400).json({
        message: "k có sp nào",
      });
    }
    return res.status(200).json({
      message: "delete succes",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
