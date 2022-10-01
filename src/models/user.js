const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

function signup(data, cb){
    let sql = ` INSERT INTO users
    (Username, Password, CreatedAt, UpdatedAt)
    VALUES (?, ?, now(), now())
    `;
    let values = [];
    values.push(data.username);
    values.push(data.password);
    sqlConnection.excuteQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function strongSignup(data,cb) {
    let sql = ` INSERT INTO users
    (Username, Password, CreatedAt, UpdatedAt)
    VALUES (?, ?, now(), now())
    `;
    let values = [];
    values.push(data.username);
    bcrypt.hash(data.password , 8 , function(err, hash) {
        if(err){
            console.log(err);
            return;
        }
    })
    values.push(hash);
    sqlConnection.excuteQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function login(data, cb){
    let sql = ` SELECT ID as UserID, Username, Password
    From users WHERE
    Username = ?
    `;
    let values = [];
    values.push(data.username);
    sqlConnection.excuteQuery(sql, values, function(err, result) {
        if(data.password == result[0].password){
            cb(err, result);
        } else {
            cb(err, []);
        }
    })
}

function strongLogin(data, cb){
    let sql = ` SELECT ID as UserID, Username, Password
    FROM users WHERE
    Username = ?
    `;
    let values = [];
    values.push(data.username);
    sqlConnection.excuteQuery(sql, values, function(err, result) {
        const isValid = bcrypt.compareSync(data.password, result[0].Password);
        if(isValid){
            const token = auth.newToken(result[0]);

            const response = [
                {
                    UserID : result[0].UserID,
                    Username : result[0].Username,
                    authToken : token
                }
            ];
            cb(err,response);
        } else {
            cb(err, []);
        }
    });
}

function getUserSigupDetails(data, cb) {
    let sql = ` SELECT ID as UserID, Username, Password
                users WHERE
                Username = ? AND Password = ?
    `;
    let values = [];
    values.push(data.username);
    values.push(data.password);
    sqlConnection.excuteQuery(sql, values, function(err, result) {
        cb(err, result);
    })
}

function getUserByID(id, cb){
    let sql = ` SELECT ID as UserID, username
                FROM users WHERE
                ID = ?
    `;
    let values = [id];
    sqlConnection.excuteQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {
    signup,
    login,
    getUserSigupDetails,
    strongSignup,
    strongLogin,
    getUserByID
};