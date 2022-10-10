const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, cb){
    let sql = `INSERT INTO orderItems
                (orderID, productID, quantity, CreatedAt, UpdatedAt)
                VALUES (?, ?, ?, now(), now())
    `;
    let values = [];
    values.push(data.orderID);
    values.push(data.productID);
    values.push(data.quantity);
    sqlConnection.excuteQuery(sql, values, function(err,result){
        cb(err, result);
    });
}

function editOrderItem(data, cb){
    let sql = `UPDATE orderItems SET
                quantity = ?, UpdatedAt = now()
                WHERE orderID = ? AND prductID = ?
    `;
    let values = [];
    values.push(data.quantity);
    values.push(data.orderID);
    values.push(data.productID);
    sqlConnection.excuteQuery(sql, values, function(err,result){
        cb(err, result);
    });
}

function deleteOrderItems(data, cb){
    let sql = `DELETE FROM orderItems
                orderID = ? AND productID = ?
    `;
    let values = [];
    values.push(data.orderID);
    values.push(data.productID);
    sqlConnection.excuteQuery(sql, values, function(err,result){
        cb(err, result);
    });
}

function getOrderItems(data,cb){
    let sql = `SELECT * FROM orderItems
                WHERE
                orderID = ?, productID = ?
    `;
    let values = [];
    values.push(data.orderID);
    values.push(data.productID);
    sqlConnection.excuteQuery(sql, values, function(err,result){
        cb(err, result);
    });
}

module.exports = {
    addOrderItem,
    editOrderItem,
    deleteOrderItems,
    getOrderItems
}