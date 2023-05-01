import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileNameArray = file.originalname.split(".");
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${
        fileNameArray[fileNameArray.length - 1]
      }`
    );
  },
});

export const upload = multer({ storage: storage });
