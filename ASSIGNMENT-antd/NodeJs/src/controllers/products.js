import Product from "../models/products";
import productSchema from "../schemas/products";
import Category from "../models/categories";

export const getAll = async (req, res) => {
  const {
    _sort = "createAt",
    _order = "asc",
    _limit = "100",
    _page = 1,
    _keywords,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  try {
    const searchData = (products) => {
      return products?.docs?.filter((item) =>
        item.name.toLowerCase().includes(_keywords)
      );
    };
    const products = await Product.paginate({}, options);
    if (products.length === 0 || products.docs.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }

    const searchDataProduct = await searchData(products);
    const productResponse = await { ...products, docs: searchDataProduct };
    console.log("searchDataproduct", searchDataProduct);

    return res.json({
      message: "Lấy sản phẩm thành công",
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
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const fileData = req.file;
    console.log(fileData);
    // validate
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const product = await Product.create(req.body);
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id },
    });
    if (!product) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    // Kiểm tra dữ liệu
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const {
      name,
      price,
      description,
      image,
      createdAt,
      updatedAt,
      categoryId,
    } = req.body;

    // lấy lại category cũ
    const oldData = await Product.findById(req.params.id);
    const oldCategory = await oldData.categoryId;
    const newCategory = categoryId;

    const productupdate = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    //xóa product ở category cũ
    await Category.findByIdAndUpdate(
      { _id: oldCategory },
      {
        $pull: { products: productupdate._id },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(productupdate.categoryId, {
      $addToSet: { products: productupdate._id },
    });
    if (!productupdate) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      productupdate,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    // const id = req.params.id;
    // const { isHardDelete } = req.body;
    // const { error } = productSchema.validate(req.body, { abortEarly: false });
    // if (error) {
    //   const errors = error.details.map((message) => ({ message }));
    //   return res.status(400).json({ errors });
    // }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: { products: product._id },
    });
    // Nếu client gửi lên isHardDelete = true thì xóa sản phẩm vĩnh viễn
    // Ngoài ra xóa luôn id sản phẩm khỏi danh sách products ở category
    // if (isHardDelete) {
    //   await products.forceDelete();
    //   // Xóa sản phẩm cũ khỏi danh sách products của category cũ
    //   await Category.findByIdAndUpdate(products.categoryId, {
    //     $pull: { products: products._id },
    //   });
    // } else {
    //   await products.delete();
    // }
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
