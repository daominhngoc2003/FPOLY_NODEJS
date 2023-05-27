import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/auth";
dotenv.config();

export const checkPermission = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: "k có quyền",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById({ _id });
  if (!user) {
    return res.status(400).json({
      message: "k có quyền",
    });
  }
  if (user.role !== "admin") {
    return res.status(400).json({
      message: "k có quyền chỉnh sửa tài nguyên",
    });
  }
  req.user = user;
  next();
};
