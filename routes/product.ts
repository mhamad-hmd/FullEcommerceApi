
const router = require('express').Router();
import { Request, Response } from "express";
const bodyParser = require('body-parser')
const {verifyToken,VerifyTokenAndAuthorization, VerifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require("crypto-js");
const Product = require('../models/Product');



const jsonParser = bodyParser.json()


router.post("/", VerifyTokenAndAdmin, async (req:Request, res:Response) => {
    //creating new product from the request body
    const newProduct = new Product(req.body)
    try{
        //saving our new product to the DB
    const savedProduct =  await newProduct.save()
    res.status(200).json(savedProduct)
    }catch(err){res.status(500).json(err)}
})

// Update
router.put("/:id", VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    

    try{
        //findind product  in th DB by his id 
        const updateProduct = await Product.findByIdAndUpdate(req.params.id , {
            //setting what is in the body to the product example:updating img
            $set: req.body
        }, {new:true})
        res.status(200).json(updateProduct)
    }catch (err) {res.status(500).json(err)}

});

//Delete


router.delete("/:id", VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted successfully")
    }catch(err) {
        res.status(500).json(err)
    }
} );

// get Product

router.get("/find/:id",async(req:Request, res:Response) => {
    try{
       
       const product = await Product.findById(req.params.id)
       res.status(200).json(product)
       console.log(product)
       
    }catch(err) {
        res.status(500).json(err)
    }
} );


// //get all Products

router.get("/",async(req:Request, res:Response) => {

    //creating a query '?'
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qTag = req.query.tag
    try{
        let products;
        //checking wich query is availbe
        if(qNew){
            //presenting latest products added
            products = await Product.find().sort({createAt: -1}).limit(1);
        }
        else if(qCategory) {
            //presenting products depending on the category 
            products = await Product.find({
                categories: {
                    // checking if wich products have the qCategory inside of there categories
                    $in:[qCategory]
                }
            })
        }
        else if(qTag) {
            //presenting products depending on the category 
            products = await Product.find({
                tags: {
                    // checking if wich products have the qCategory inside of there categories
                    $in:[qTag]
                }
            })
        }


        //IF NOT QUERY IS PROVIDED THEN PRESENT ALL PRODUCTS
        else{
            products = await Product.find()
        }

       //responding with users
       res.status(200).json(products)
       
    }catch(err) {
        res.status(500).json(err)
    }
} );




module.exports = router

