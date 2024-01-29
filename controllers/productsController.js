const mySqlDB = require("../config/db");
const async = require("async");
//All Products
//[GET] /products
const getAllProducts = (req, res) => {
  // const tasks = [
  //   function (callback) {
  //     let sql = "SELECT * FROM `view_product_laptops`";
  //     mySqlDB.query(sql, function (err, results) {
  //       if (err) {
  //         return callback(err);
  //       }
  //       callback(null, results);
  //     });
  //   },
  //   function (callback) {
  //     let sql = "SELECT * FROM `view_product_headphones`";
  //     mySqlDB.query(sql, function (err, results) {
  //       if (err) {
  //         return callback(err);
  //       }
  //       callback(null, results);
  //     });
  //   },
  // ];
  async.parallel(tasks, function (err, results) {
    if (err) {
      return console.error(err);
    }
    results = results.reduce((accumulator, currentValue) =>
      accumulator.concat(currentValue)
    );
    results.map((item) => {
      item["image_url"] = item.image;
    });
    res.send(JSON.stringify(results));
  });
};
//[DELETE] /products/:id
const deleteProduct = (req, res) => {
  let sql = "DELETE FROM `products` WHERE id = ?";
  mySqlDB.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    res.status(200).json({ message: `Delete todo ${req.params.id}` });
  });
};
module.exports = {
  //All
  getAllProducts,
  deleteProduct,
};
