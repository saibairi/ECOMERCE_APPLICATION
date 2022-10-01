const mysql = require("mysql2");
const config = require("../constants/backendConfig");
var pool = mysql.createPool(config.mysql.local);


function excuteQuery(sql, data, callback){
    pool.getConnection(function(err, Connection) {
        if(err) {
            callback(err);
        } else {
            Connection.query(sql, data, function(err1, result) {
                if(err1) {
                    callback(err1);
                } else {
                    Connection.release();
                    callback(err1, result);
                }
            })
        }
    })
}

module.exports = {excuteQuery};