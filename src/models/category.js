const sqlConnection = require("../services/sqlConnection");

function listCategories(callback) {
    let sql = "SELECT ID as categoryID, Name as name from categories";
    let data = [];
    sqlConnection.excuteQuery(sql, data, function (err, result) {
        callback(err, result);
    });
}

module.exports = {listCategories};