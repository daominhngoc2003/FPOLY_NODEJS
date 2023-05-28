import User from "../models/auth";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { signupSchema, signinSchema } from "../schemas/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const { username, email, password, confirmPasword } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    User.password = undefined;
    return res.json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password không tồn tại",
      });
    }
    User.password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 600 * 600,
    });
    return res.json({
      message: "Đăng nhập thành công",
      user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
