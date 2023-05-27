import bcrypt from "bcryptjs";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { signupChema, signinSchema } from "../schemas/auth";
dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, password, email, confirmPassword } = req.body;
    const { error } = signupChema.validate(req.body, { abortEarly: false });
    // const { data: user } = await axios.post(req.body);

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Kiểm tra email tồn tại
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hassedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hassedPassword,
    });
    user.password = undefined;

    // tạo tokrn từ server
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      user,
      accessTokem: token,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }

    // nó vừa mã hóa vừa so sánh
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }
    user.password = undefined;

    // Tạo token từ server
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(201).json({
      message: "Đăng nhập thành công",
      accessTokem: token,
      user,
    });
  } catch (error) {}
};

export { signup, signin };

/**
 * Bước 1: Nhận request từ client gửi lên
 * Bước 2: Kiểm tra cú pháp của request
 * Bước 3: Kiểm tra xem email đã tồn tại trong db chưa? nếu tồn tại thì trả về thông báo
 * Bước 4: So sánh mật khẩu từ client gửi lên với mật khẩu trong db
 * Bước 5: Nếu mật khẩu không khớp thì trả về thông báo
 * Bước 6: Tạo token và trả về client bao gồm thông tin user và token
 */
