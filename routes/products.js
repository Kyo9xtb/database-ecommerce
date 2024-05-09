const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllProducts,
  deleteProduct,
} = require("../controllers/productsController");
const {
  getLaptops,
  storeLaptop,
  detailLaptop,
  updateLaptop,
} = require("../controllers/productLaptopController");

// Khai báo nơi lưu trữ file ảnh
// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, "./public/images/");
//   },
//   filename: (req, file, callBack) => {
//     callBack(null, file.fieldname + "-" + file.originalname);
//   },
// });
// const upload = multer({
//   storage: storage,
// });
router.route("/").get(getAllProducts);
router.route("/:id").delete(deleteProduct);
//Laptops
router.route("/laptops").get(getLaptops).post(multer().array(), storeLaptop);
router.route("/laptops/:id").get(detailLaptop).put(updateLaptop);

module.exports = router;
