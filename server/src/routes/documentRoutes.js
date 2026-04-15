// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/uploadMiddleware");
// const authMiddleware = require("../middleware/authMiddleware");

// router.post(
//   "/upload",
//   authMiddleware,
//   upload.single("file"),
//   (req, res) => {
//     res.json({
//       message: "File uploaded successfully",
//       file: req.file,
//     });
//   }
// );

// module.exports = router;


const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { processDocument } = require("../controllers/documentController");

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  processDocument
);

module.exports = router;