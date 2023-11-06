const multer = require("multer");
const {
  maxFileSizeInBytes,
  mimetypesWhitelist,
  fileExtensionsWhiteList,
} = require("../constants/multer");
const { extname, join } = require("path");

const storage = multer.diskStorage({
  destination: join(__dirname, "../attach"),
  filename: function (req, file, cb) {
    cb(null, req.user.id + "#" + file.originalname);
  },
});

const upload = multer({
  limits: {
    fieldNameSize: 200,
    fileSize: maxFileSizeInBytes, // 15Mb in bytes
  },
  storage,
  fileFilter: function (req, file, cb) {
    console.log("🚀 ~ file: multer.js:51 ~ file.mimetype:", file.mimetype);
    if (!validFileType(file.mimetype))
      return cb(new Error("Archivo no permitido"));
    if (!validFileExtension(file.originalname))
      return cb(new Error("Archivo no permitido"));
    return cb(null, true);
  },
});

const validFileType = (mimetype) => {
  console.log("🚀 ~ file: multer.js:54 ~ validFileType ~ mimetype:", mimetype);
  return mimetypesWhitelist.includes(mimetype);
};

const validFileExtension = (fileName) => {
  return fileExtensionsWhiteList.includes(extname(fileName).slice(1));
};

module.exports = {
  upload,
};
