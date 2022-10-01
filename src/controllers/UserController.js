const User = require("../models/user");

function signup(req, res) {
    let data = req.body;
    if(data.username && data.password) {                                  //if user enter the username and password
        User.getUserSigupDetails(data, function (err, result ) {          //checking for already exising user 
            if(err){                                                                                               
                console.log(err);
                return res.status(500).send({
                    message : "Error during signup",
                    success : false
                });
            }
            if(result.length > 0 ) {                                      //if useralready exist  
                return res.status(409).send({
                    message : " user already exist",
                    success  : false
                });
            } else {                                                     //if user not exist
                User.strongSignup(data, function (err, result) {               // if user not exist go for signup   //for normal user sign up use "user.singup", and for hashed passed use "user.strongSignup"
                    if(err) {
                        console.log(err);
                        return res.status(500).send({
                        message : " Error during singnup",
                        success : false
                        });
                    }
                    return res.status(200).send({
                        message : " Successfully signed up...!!",
                        success : true
                    });
                });
            }
        })
    } else {                                                     //if user not enter username or password
        return res.status(400).send({
            message : "Username or Password missing",
            success : false
        });
    }
}


function login(req, res) {
    let data = req.body;
    if(data.username && data.password) {
        User.strongLogin(data, function (err, result) {  //for normal user login use "user.login", and for hashed passed use "user.strongLogin"
            if(err){
                console.log(err);
                return res.status(500).send({
                    message : "Something went wrong not able to login",
                    success : false
                });
            }
            if(result.length == 0) {
                return res.status(404).send({
                    message : "Username or password is incorrect",
                    success : false
                });
            }
            return res.status(200).send({
                message : "Successfully logged in",
                success : true,
                response : result
            });
        });
    } else {
        return res.status(400).send({
            message : "Username or password not pressent",
            success : false
        });
    }
}

module.exports = {signup,login};