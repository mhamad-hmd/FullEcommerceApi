"use strict";
exports.__esModule = true;
var router = require('express').Router();
var bodyParser = require("body-parser");
var stripe = require("stripe")(process.env.STRIPE_KEY);
var jsonParser = bodyParser.json();
router.post("/payment", function (req, res) {
    stripe.charges.create({
        //when user mkaes a purchase from front end stripe genetrates a token id so we use it here
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, function (stripeErr, stripeRes) {
        if (stripeErr) {
            res.status(550).json(stripeErr);
        }
        else {
            res.status(200).json(stripeRes);
        }
    });
});
module.exports = router;
