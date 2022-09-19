
const router = require('express').Router();
import bodyParser = require("body-parser");
import { Request, Response } from "express";



const stripe = require("stripe")(process.env.STRIPE_KEY)
const jsonParser = bodyParser.json()


router.post("/payment", (req:Request, res:Response) => {
    stripe.charges.create({
        //when user mkaes a purchase from front end stripe genetrates a token id so we use it here
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",

    },
    (stripeErr:Error, stripeRes:Response) => {
        if(stripeErr){
            res.status(550).json(stripeErr);
        } else{
            res.status(200).json(stripeRes);
        }
    });
})


module.exports = router
