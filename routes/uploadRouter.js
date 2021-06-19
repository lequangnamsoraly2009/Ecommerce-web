const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
// We will upload image on cloudinary

//Config the cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Upload Image on Cloud
router.post("/upload",  async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) // Object.keys(req.files).length  -> check number keys in files -> If 1 files complete so length > 0
      return res.status(400).json({ status: false, msg: "No files uploaded" });

    const file = req.files.file;
    // check file upload > 1mb
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ status: false, msg: "Size too large" });
    }

    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      removeTmp(file.tempFilePath);

      return res
        .status(400)
        .json({ status: false, msg: "File format is incorrect" });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "Ecommerce-web" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
});

//Delete Image
router.post("/destroy",  (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(400).json({ status: false, msg: "Don't have a file" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json("Test image delete");
    });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
});

// Delete file into folder Tmp
// when we submit 1 file, although it incorrect but It will save 1 file into tmp -> so I need delete it and save it on cloud
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
