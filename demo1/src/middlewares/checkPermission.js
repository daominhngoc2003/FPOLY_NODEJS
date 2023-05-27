// Code này đang hướng dẫn viết middleware check quyền truy cập tài nguyên trên một ứng dụng web.
// Bước 1: Đầu tiên, code kiểm tra xem trong header của request có chứa thông tin authorization không. Nếu không có, server sẽ trả về một thông báo lỗi "Unauthorized".

// Bước 2: Nếu headers.authorization tồn tại, chúng ta sẽ tách chuỗi và lấy phần tử thứ 2, tức là token.

// Bước 3: Tiếp theo, server kiểm tra tính hợp lệ của token này thông qua việc giải mã token bằng jwt.verify. Nếu token không hợp lệ (do bị giả mạo hoặc sai secret key), server sẽ trả về thông báo lỗi "Unauthorized".

// Bước 4: Sau khi giải mã token thành công, server sẽ lấy ID của user từ token. Server tiếp tục kiểm tra xem user có tồn tại trong database không.

// Bước 5: Sau khi kiểm tra user tồn tại trong database, server sẽ kiểm tra quyền của user này có phải là "admin" không. Nếu quyền không phải là "admin", server sẽ trả về thông báo lỗi "Bạn không có quyền truy cập tài nguyên".

// Bước 6: Nếu user và quyền của user hợp lệ, server sẽ cho phép truy cập tài nguyên.

// Bước 7: Cuối cùng, middleware checkPermission này sẽ được gắn vào router nào cần kiểm tra quyền truy cập tài nguyên.

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user";
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
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role != "admin") {
      return res.status(401).json({
        message: "Bạn không có quyền truy cập tài nguyên",
      });
    }
    req.user = user;
    next();
  } catch (error) {}
};

// Bước 1: kiểm tra thông tin token gửi có không? Nếu không có thì thông báo cần phải đăng nhập
// Bước 2: Lấy token bằng cách chuyển từ chuỗi sang mảng và lấy phần tử thứ 2
// Bước 3: Kiểm tra token có hợp lệ không? Nếu không hợp lệ thì thông báo cần phải đăng nhập
// Bước 4: Giải mã token và lấy ID, kiểm tra ID tồn tại trong db không?
// Bước 5: Kiểm tra quyền của user có phải là admin không? Nếu không phải thì thông báo không có quyền truy cập tài nguyên
// Bước 6: Nếu hợp lệ thì cho phép truy cập tài nguyên
// Bước 7: Gắn middleware vào router nào cần check quyền
