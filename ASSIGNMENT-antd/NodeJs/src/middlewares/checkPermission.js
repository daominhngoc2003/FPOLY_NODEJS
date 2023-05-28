import dotenv from "dotenv";
import User from "../models/auth";
import jwt from "jsonwebtoken";
dotenv.config();

export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    console.log(user);
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "Không có quyền truy cập vào tài nguyên",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
