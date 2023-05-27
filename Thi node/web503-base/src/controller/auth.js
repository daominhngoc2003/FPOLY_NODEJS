import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../model/auth";
import { SigninSchema, SigniupSchema } from "../schema/auth";
dotenv.config();

export const signin = async (req, res) => {
  try {
    const { error } = await SigninSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email k tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "password k tồn tại",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user,
      accesstoken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { error } = await SigniupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password, name, confirmPassword } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    User.password = undefined;

    return res.status(200).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
