// import express from "express";
// import multer from "multer";
// import { UploadImage } from "../controllers/upload";
// const router = express.Router();
// const upload = multer({ dest: "uploads/" });
// // ADD PRODUCT
// router.post("/images", upload.array("image", 5), UploadImage);

// // // //UPDATE
// // router.put("/images/:id", upload.array("image", 5));

// // //DELETE
// // router.delete("/images/:id");
// export default router;

import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { deleteImage, uploadImage } from "../controllers/upload";
import cloudinary from "../config/cloudinary";
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "WEB503_nodejs",
    format: "png",
  },
});

const upload = multer({ storage: storage });

router.post("/images/upload", upload.array("images", 10), uploadImage);
router.delete("/images/:publicId", deleteImage);

export default router;
