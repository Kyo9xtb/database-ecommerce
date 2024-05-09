const mySqlDB = require("../config/db");
const async = require("async");
//[GET] /products/laptops
const getLaptops = (req, res) => {
  if (req.query.brand !== undefined) {
    tasks = [
      function acer(callback) {
        let sql = "SELECT * FROM " + `view_product_laptop_${req.query.brand}`;
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
    ];
  } else {
    tasks = [
      function acer(callback) {
        let sql = "SELECT * FROM `view_product_laptop_acer`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function asus(callback) {
        let sql = "SELECT * FROM `view_product_laptop_asus`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function dell(callback) {
        let sql = "SELECT * FROM `view_product_laptop_dell`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function gigabyte(callback) {
        let sql = "SELECT * FROM `view_product_laptop_gigabyte`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function hp(callback) {
        let sql = "SELECT * FROM `view_product_laptop_hp`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function lenovo(callback) {
        let sql = "SELECT * FROM `view_product_laptop_lenovo`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function lg(callback) {
        let sql = "SELECT * FROM `view_product_laptop_lg`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function microsoft(callback) {
        let sql = "SELECT * FROM `view_product_laptop_microsoft`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
      function msi(callback) {
        let sql = "SELECT * FROM `view_product_laptop_msi`";
        mySqlDB.query(sql, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      },
    ];
  }
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

//[GET] /products/laptops/:id
const detailLaptop = (req, res) => {
  let sql = "SELECT `brand` FROM `products` WHERE `id` = ?";
  mySqlDB.query(sql, [req.params.id], function getBrandProduct(err, result) {
    if (err) throw err;
    if (result.length) {
      let sql =
        "SELECT * FROM " +
        `view_product_laptop_${result[0].brand}` +
        " WHERE `id` = ? ";
      mySqlDB.query(
        sql,
        [req.params.id],
        function getProductDetails(err, results) {
          if (err) throw err;
          res.send(JSON.stringify(results));
        }
      );
    } else {
      res
        .status(200)
        .json({ message: `Product code ${req.params.id} was not found` });
    }
  });
};

//[POST] /products/laptops
const storeLaptop = (req, res) => {
  const {
    product_name,
    brand,
    type,
    market_price,
    sale,
    chipset,
    cpu_type,
    ram_capacity,
    slot_number,
    maximum_ram_capacity,
    gpu,
    hard_drive,
    optical_drive,
    card_reader,
    security_technology,
    screen,
    webcam,
    audio_technology,
    network_interface,
    wireless_interface,
    communications_port,
    battery_capacity,
    size,
    weight,
    operating_system,
    accessories_included,
    launch_time,
    warranty_time,
    temporary_picture,
  } = req.body;
  console.log(">>>> req.body", req.body);
  console.log(typeof type);
  let link_code = Date.now();
  // let image = req.files["mainImage"][0].filename;
  let image = temporary_picture;
  const isCheckBrand = true;
  console.log(isCheckBrand);
  if (isCheckBrand) {
    console.log("isCheckBrand", isCheckBrand);
    let sqlst =
      "INSERT INTO `products`( `product_name`, `brand`, `type`, `market_price`, `sale`, `image`, `link_code`) VALUES (?,?,?,?,?,?,?)";
    mySqlDB.query(
      sqlst,
      [product_name, brand, type, market_price, sale, image, link_code],
      (err) => {
        if (err) {
          throw err;
        } else {
          let sqlnd =
            "INSERT INTO " +
            `product_details_laptop_${brand}` +
            "(`link_code`, `chipset`, `cpu_type`, `ram_capacity`, `slot_number`, `maximum_ram_capacity`, `gpu`, `hard_drive`, `optical_drive`, `card_reader`, `security_technology`, `screen`, `webcam`, `audio_technology`, `network_interface`, `wireless_interface`, `communications_port`, `battery_capacity`, `size`, `weight`, `operating_system`, `accessories_included`, `launch_time`, `warranty_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          mySqlDB.query(
            sqlnd,
            [
              link_code,
              chipset,
              cpu_type,
              ram_capacity,
              slot_number,
              maximum_ram_capacity,
              gpu,
              hard_drive,
              optical_drive,
              card_reader,
              security_technology,
              screen,
              webcam,
              audio_technology,
              network_interface,
              wireless_interface,
              communications_port,
              battery_capacity,
              size,
              weight,
              operating_system,
              accessories_included,
              launch_time,
              warranty_time,
            ],
            (err) => {
              if (err) {
                console.log(err.sqlMessage);
                res.send({
                  message: `Product brand '${brand.toUpperCase()}' does not exist`,
                  status: "Failed",
                });
              } else {
                res.send({
                  message: `Added product ${product_name} successfully`,
                  status: "Successfully",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.send({
      message: `Product brand '${brand.toUpperCase()}' does not exist`,
      status: "Failed",
    });
  }
};
//[PUT] /products/laptops/:id
const updateLaptop = (req, res) => {
  const {
    product_name,
    brand,
    type,
    market_price,
    sale,
    chipset,
    cpu_type,
    ram_capacity,
    slot_number,
    maximum_ram_capacity,
    gpu,
    hard_drive,
    optical_drive,
    card_reader,
    security_technology,
    screen,
    webcam,
    audio_technology,
    network_interface,
    wireless_interface,
    communications_port,
    battery_capacity,
    size,
    weight,
    operating_system,
    accessories_included,
    launch_time,
    warranty_time,
  } = req.body;
  // let image = req.files["mainImage"][0].filename;
  let image = null;
  let sqlBrand = "SELECT  `brand` FROM `products` WHERE `id` = ?";
  mySqlDB.query(sqlBrand, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  });
  let sqlst =
    "UPDATE `products` SET `product_name`=?,`brand`=?,`type`=?,`market_price`=?,`sale`=?,`image`=? WHERE `id`=?";
  mySqlDB.query(
    sqlst,
    [product_name, brand, type, market_price, sale, image, req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send({
          message: `Update product code '${id}' does not exist`,
          status: "Failed",
        });
      } else {
      }
    }
  );
};

module.exports = {
  //Laptop
  getLaptops,
  detailLaptop,
  storeLaptop,
  updateLaptop,
};
