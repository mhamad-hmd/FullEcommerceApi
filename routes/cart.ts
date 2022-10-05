
const router = require('express').Router();
import { Request, Response } from "express";
const bodyParser = require('body-parser')
const {verifyToken,VerifyTokenAndAuthorization, VerifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require("crypto-js");
const Cart = require('../models/Cart');



const jsonParser = bodyParser.json()

//CREATE

router.post("/", verifyToken, async (req:Request, res:Response) => {
    //creating new Cart from the request body   
    const newCart = new Cart(req.body)
    try{
        //saving our new Cart to the DB
    const savedCart =  await newCart.save()
    res.status(200).json(savedCart)
    }catch(err){res.status(500).json(err)}
})

// // Update
router.put("/:id", VerifyTokenAndAuthorization,async(req:Request, res:Response) => {
    

    try{
        //findind Cart  in th DB by his id 
        const updateCart = await Cart.findByIdAndUpdate(req.params.id , {
            //setting what is in the body to the Cart example:updating img
            $set: req.body
        }, {new:true})
        res.status(200).json(updateCart)
    }catch (err) {res.status(500).json(err)}

});

// //Delete

router.delete("/:id", VerifyTokenAndAuthorization,async(req:Request, res:Response) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted successfully")
    }catch(err) {
        res.status(500).json(err)
    }
} );


// get user Cart

router.get("/find/:userId", verifyToken,async(req:Request, res:Response) => {
    try{
       
       const cart = await Cart.findOne({userId: req.params.userId})
       res.status(200).json(cart)
       
    }catch(err) {
        res.status(500).json(err)
    }
} );


// // //get all

router.get("/",  VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts)
    }catch (err){res.status(500).json(err)}
})




module.exports = router