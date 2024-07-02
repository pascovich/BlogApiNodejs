// upload.middleware.js

import multer from "multer";

const MINE_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + "-" + file.originalname);
  //   },
  filename: function (req, file, cb) {
    const name = file.originalname.split(" ").join("_");
    const extension = MINE_TYPES[file.mimetype];
    cb(null, Date.now() + "-" + name + extension);
  },
});

// const upload = multer({ storage });
const upload = multer({ storage }).single("image");

export default upload;
