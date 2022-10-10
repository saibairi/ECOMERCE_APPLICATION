const sqlConnection = require("../services/sqlConnection");

function listOrderDetails(data, cb){
    let sql = `SELECT * FROM 
                orderdetails O INNER JOIN
                orderItems OI ON
                O.ID  = OI.orderID
                INNER JOIN products P ON
                OI.productID = P.ID
                WHERE O.userID = ?
    `;
    let values = [data.userID];
    sqlConnection.excuteQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function findOrderByUser(data, cb){
    let sql = `SELECT ID, total
                FROM orderDetails
                WHERE
                userID = ? AND orderStastu = 1 
    `;
    let values = [data.userID];
    sqlConnection.excuteQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function addOrder(data, cb){
    let sql = `INSERT INTO orderDetails
                (total, userID, orderStatus, CreatedAt, UpdatedAt)
                VALUES (?, ?, 1, now(), now())
    `;
    let values = [];
    values.push(data.total);
    values.push(data.userID);
    sqlConnection.excuteQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function editOrder(data, cb) {
    let sql = `UPDATE orderDetails SET
                total = ?, orderStatus = ?,
                UpdatedAt = now(), WHERE ID = ?
    `;
    let values = [];
    if(data.payment){
        sql = `UPDATE orderDetails SET orderStatus = ?
                UpdatedAt = now() WHERE ID = ?
        `;
        values.push(2);
    } else {
        values.push(data.total);
        values.push(1);
    }
    values.push(data.orderID);
    sqlConnection.excuteQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function getOrderDetails(data, cb) {
    let sql = `SELECT od.ID as orderID od.total as total, p.ID as productID,
                p.name as productName, p.price as price, oi.quantity as quantity
                FROM orderDetails as od LEFT JOIN orderItems as oi ON
                od.ID = oi.orderID LEFT JOIN products as p ON 
                p.id = oi.productID WHERE 
                od.userID = ? AND od.orderStatus = 1
    `;
    let values = [];
    values.push(data.userID);
    sqlConnection.excuteQuery(sql, values, function(err, result){
        cb(err, result);
    });
}
module.exports = {
    listOrderDetails,
    findOrderByUser,
    addOrder,
    editOrder,
    getOrderDetails
}