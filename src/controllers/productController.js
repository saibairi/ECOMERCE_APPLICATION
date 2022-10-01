const Product = require("../models/product");

function listProducts(req,res){
    let data = req.body;                                      //getting a products by adding a filters
    Product.listProducts(data, function (err, result) {
        if(err){
            console.log(err);
            return res.status(500).send({
                message : "Not able to fetch the products",
                success : false
            });
        }
        return res.status(200).send({
            message : "Successfully fetched all the products...!!",
            success : true,
            products : result
        });
    });
}

function addProduct(req,res) {
    let data = req.body;
    if(data.name && data.price && data.description && data.categoryID && data.vendorID) {
        Product.addProduct(data, function(err, result){
            if(err) {
                return res.status(500).send({
                    message : "Something went wrong, can't add the product",
                    success : false
                });
            }
            return res.status(200).send({
                message : "Successfully added the product",
                success : true
            });
        })
    } else {
        return res.status(401).send({
            message : "incorrect parameters sent for the request",
            success : false
        });
    }
}

module.exports = {listProducts, addProduct};