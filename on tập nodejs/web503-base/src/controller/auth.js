import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/auth";
import { SigninSchema, SignupSchema } from "../schemas/auth";
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
        message: "Tài khaonr k tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "password k tồn tại",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(200).json({
      message: "Đăng nhập success",
      user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { error } = await SignupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { name, email, password, confirmPassword } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      return res.status(400).json({
        message: "password k đúng",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    User.password = undefined;

    return res.status(200).json({
      message: "Đăng ký success",
      user,
    });
  } catch (error) {}
};
