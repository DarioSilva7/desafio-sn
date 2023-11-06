const maxFileSizeInBytes = 18500000;
const maxSizeByType = {
  image: 5242880, //5mb
};

const MIMETYPES = {
  WEBP: "image/webp",
  JPG: "image/jpg",
  JPEG: "image/jpeg",
  PNG: "image/png",
};

const whiteListImages = [
  {
    mimetype: MIMETYPES.PNG,
    extension: "png",
    maxFileSize: maxSizeByType.image,
  },
  {
    mimetype: MIMETYPES.JPEG,
    extension: "jpeg",
    maxFileSize: maxSizeByType.image,
  },
  {
    mimetype: MIMETYPES.JPG,
    extension: "jpg",
    maxFileSize: maxSizeByType.image,
  },
  {
    mimetype: MIMETYPES.WEBP,
    extension: "webp",
    maxFileSize: maxSizeByType.image,
  },
];

const fileExtensionsWhiteList = [
  ...whiteListImages.map((listItem) => listItem.extension),
];

const mimetypesWhitelist = [
  ...whiteListImages.map((listItem) => listItem.mimetype),
];

module.exports = {
  maxFileSizeInBytes,
  fileExtensionsWhiteList,
  mimetypesWhitelist,
};
