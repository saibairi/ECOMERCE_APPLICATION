const express= require("express");
const categoryController = require('../../../src/controllers/categoryController');
const productController = require("../../../src/controllers/productController");
const userController  = require("../../../src/controllers/UserController");

let router = express.Router();

router.get("/category/all",categoryController.listCategories);


router.get("/product/all" , productController.listProducts);
router.post("/product/add", productController.addProduct);


router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);


module.exports = router;