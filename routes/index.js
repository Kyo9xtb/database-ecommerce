const productsRouter = require("./products");
const brandsRouter = require("./brands");
function route(app) {
  app.use("/products", productsRouter);
  app.use("/brands", brandsRouter);
  app.get("/images/:file", (req, res) => {
    const file = req.params.file;
    req.user.mayViewFilesFrom(file, function (yes) {
      if (yes) {
        res.sendFile("/images/" + file);
      } else {
        res.status(403).send("Sorry! You can't see that.");
      }
    });
  });
  app.use("/", function (req, res, next) {
    res.render("index", { title: "Database Ecommerce" });
  });
}
module.exports = route;
