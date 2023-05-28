// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "fashsion-brand",
//   api_key: "582763829295819",
//   api_secret: "hO7YKPNMqasEyq1jxttMNRFlc1A",
// });

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "WEB503_nodejs",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
