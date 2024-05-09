const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getBrands,
  detailBrand,
  updateBrand,
  deleteBrand,
  postBrand,
} = require("../controllers/brandControllers");

router.route("/").get(getBrands).post(multer().array(), postBrand);
router
  .route("/:id")
  .get(detailBrand)
  .put(multer().array(), updateBrand)
  .delete(deleteBrand);

module.exports = router;
