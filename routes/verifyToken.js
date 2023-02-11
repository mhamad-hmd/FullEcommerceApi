"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
var verifyToken = function (req, res, next) {
    //storing user header in a variable
    var authHeader = req.headers.token;
    //checking if user's token is availabe
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, function (err, user) {
            if (err)
                return res.status(403).json("Token not valid");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("Your not authenticated!");
    }
};
var VerifyTokenAndAuthorization = function (req, res, next) {
    verifyToken(req, res, function () {
        //we are checkin if the user id is equal to the one in the params or if the users id admin 
        if (req.user.id === req.params.id || req.user.isAdmin) {
            return next();
        }
        else {
            return res.status(403).json("your not allowed to do that");
        }
    });
};
var VerifyTokenAndAdmin = function (req, res, next) {
    verifyToken(req, res, function () {
        //we are checkin if the user id is equal to the one in the params or if the users id admin 
        if (req.user.isAdmin) {
            return next();
        }
        else {
            return res.status(403).json("your not allowed to do that");
        }
    });
};
module.exports = { verifyToken: verifyToken, VerifyTokenAndAuthorization: VerifyTokenAndAuthorization, VerifyTokenAndAdmin: VerifyTokenAndAdmin };
