const mySqlDB = require("../config/db");

//[GET] /brand
const getBrands = (req, res) => {
  let sql = "SELECT * FROM `brands`";
  mySqlDB.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
};

const detailBrand = (req, res) => {
  let sql = "SELECT * FROM `brands` WHERE id = ?";
  mySqlDB.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
};

const postBrand = (req, res) => {
  const { name_brand, image } = req.body;
  console.log(req.body);
  let sql =
    "INSERT INTO `brands`(`brand_index`, `name`, `image`) VALUES (?,?,?)";
  mySqlDB.query(
    sql,
    [name_brand.toLowerCase(), name_brand.toUpperCase(), image],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send({
          message: `Add brand '${name_brand.toUpperCase()}' does not exist`,
          status: "Failed",
        });
      } else {
        res.send({
          message: `Add brand '${name_brand.toUpperCase()}' successfully`,
          status: "Successfully",
        });
      }
    }
  );
};
const updateBrand = (req, res) => {
  const { id, name_brand, image } = req.body;
  let sql =
    "UPDATE `brands` SET `brand_index`=?,`name`=?,`image`=? WHERE `id`=?";
  mySqlDB.query(
    sql,
    [name_brand.toLowerCase(), name_brand.toUpperCase(), image, id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send({
          message: `Update brand '${brand.toUpperCase()}' does not exist`,
          status: "Failed",
        });
      } else {
        res.send({
          message: `Update brand '${brand.toUpperCase()}' successfully`,
          status: "Successfully",
          brand: results,
        });
      }
    }
  );
};

const deleteBrand = (req, res) => {
  let sql = "DELETE FROM `brands` WHERE id = ?";
  mySqlDB.query(sql, req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.send({
        message: `Delete brand '${brand.toUpperCase()}' does not exist`,
        status: "Failed",
      });
    } else {
      res.send({
        message: `Delete brand '${brand.toUpperCase()}' successfully`,
        status: "Successfully",
      });
    }
  });
};
module.exports = {
  getBrands,
  detailBrand,
  postBrand,
  updateBrand,
  deleteBrand,
};
