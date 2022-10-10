const orderDetails  = require("../models/orderDetails");
const orderItems = require("../models/orderItem");
const product = require("../models/product");

function createOrder(req, res) {
    let data = req.body;
    if(data.userID && data.productID){
        product.getProductDetails(data, function(err, product){
            if(err){
                console.log(err);
                return res.status(500).send({
                    message : "Error in getting product...!!",
                    success : false
                });
            }
            orderDetail.findOrderByUser(data, function(err1, order){
                if(err1){
                    console.log(err1);
                    return res.status(500).send({
                        message : "Error in getting order by user...!!",
                        success : false
                    });
                }
                if(order.length > 0){
                    data.total = parseInt(order[0].total, 10) + parseInt(product[0].price, 10);
                    data.orderID  = order[0].ID;
                    orderDetails.editOrder(data, function(err2, orderDetails){
                        if(err2){
                            console.log(err2);
                            return res.status(500).send({
                                message : "Error in getting orderdetails...!!",
                                success : false
                            });
                        }
                        orderItems.addOrderItem(data, function(err3, orderItem){
                            if(err3){
                                console.log(err3);
                                return res.status(500).send({
                                    message : "Error in creating the order item...!!",
                                    success : false
                                });
                            }
                            return res.status(200).send({
                                message : "order created successfully",
                                success : true,
                                orderDetails : {
                                    orderID : order[0].ID
                                }
                            });
                        });
                    });
                } else {
                    data.total = parseInt(product[0].price, 10);
                    orderDetail.addOrderItem(data, function (err2, orderDetail){
                        if(err2){
                            console.log(err2);
                            return res.status(500).send({
                                message : "Error in editing order details...!!",
                                success : false
                            });
                        }
                        data.orderID = orderDetail.insertID;
                        orderItem.addOrderItem(data, function(err3, orderItem){
                            if(err3){
                                console.log(err3);
                                return res.status(500).send({
                                    message : "Error in creating the order item...!!",
                                    success : false
                                });
                            }
                            return res.status(200).send({
                                message : "order created successfully",
                                success : true,
                                orderDetails : {
                                    orderID : orderDetail.insertID
                                }
                            });
                        })
                    });
                }
            })
        })
    } else {
        return res.status(400).send({
            message : "Invalied data passed...!!",
            success : false
        });
    }
}

function getOrderDetails(req, res) {
    let data = res.body;
    if(data.userID){
        orderDetail.listOrderDetails( data, function(err, result){
            if(err){
                return res.status(500).send({
                    message : "not able to fetch the data...!!",
                    success : false
                });
            }
            return res.status(200).send({
                message : "Fetched the product details...!!",
                success : true,
                orderDetails : result
            });
        })
    }
}

function editOrderDetails(req,res){

}

module.exports = {
    createOrder,
    getOrderDetails,
    editOrderDetails
}