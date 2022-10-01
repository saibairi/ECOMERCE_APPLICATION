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
    sqlConnection.excuteQuery(sql. values, function(err,result) {
        cb(err, result);
    });           
}

module.exports = {listProducts, addProduct};