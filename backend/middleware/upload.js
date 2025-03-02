const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes", // Cloudinary folder name
    format: async (req, file) => "jpg", // Convert all images to jpg
    public_id: (req, file) => file.originalname.split(".")[0], // Keep original name
  },
});

const upload = multer({ storage });

module.exports = upload;
