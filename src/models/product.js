const sqlConnection = require('../services/sqlConnection');

function listProducts(data, cb){
    let sql = "SELECT ID as productID, Name as name, Price as price FROM products";
    let values = [];
    if(data.categoryID){                        //adding fillter to get products in a specific category by category ID
        sql += " WHERE CategoryID = ?";
        values.push(data.categoryID);
        if(data.minPrice){                      //filtter for both categoryID  and minimum price
            sql += " AND Price >= ?";
            values.push(data.minPrice);
        } else if(data.maxPrice){               //filtter for both categoryID  and maximum price
            sql += " AND Price <= ?";
            values.push(data.maxPrice);
        }
    } else  if(data.minPrice){                  //filtter for products of minimum  price   
        sql += " WHERE Price >= ?";
        values.push(data.minPrice);
    } else if(data.maxPrice){                   //filtter for products of maximum  price  
        sql += " WHERE Price <= ?";
        values.push(data.maxPrice);
    }
    sqlConnection.excuteQuery(sql,values, function(err, result){
        cb(err,result);
    });
}

function addProduct(data, cb) {
    let sql = `INSERT INTO products
                (Name,Price,Deription,CategoryID,VendorID,CreatedAt, UpdatedAt)
                VALUES (?, ?, ?, ?, ?, now(), now())
                `;
    let values = [];
    values.push(data.name);
    values.push(data.price);
    values.push(data.description);
    values.push(data.categoryID);
    values.push(data.vendorID); 
    console.log(values);
    sqlConnection.excuteQuery(sql. values, function(err,result) {
        cb(err, result);
    }); 

}

function getProductDetails(data, cb){
    let sql = `SELECT p.Name as name p.Price as price, p.Description as description,
                if((SELECT Count(*) FROM orderDetails as od LEFT JOIN orderItems as oi ON
                oi.orderID = od.ID WHERE oi.productID = p.ID AND od.user.ID = ? AND od.orderStatus = 1) > 0, 1, 0) AS
                addedToCart FROM products as p WHERE p.id = ? LIMIT 1 
    `;
    let values = [];
    values.push(data.userID);
    values.push(data.productID);
    sqlConnection.excuteQuery(sql. values, function(err,result) {
        cb(err, result);
    }); 
}

module.exports = {listProducts, addProduct, getProductDetails};