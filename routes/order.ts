
const router = require('express').Router();
import { Request, Response } from "express";
const bodyParser = require('body-parser')
const {verifyToken,VerifyTokenAndAuthorization, VerifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require("crypto-js");
const Order = require('../models/Order');



const jsonParser = bodyParser.json()

//CREATE

router.post("/", verifyToken, async (req:Request, res:Response) => {
    //creating new Order from the request body   
    const newOrder = new Order(req.body)
    try{
        //saving our new Order to the DB
    const savedOrder =  await newOrder.save()
    res.status(200).json(savedOrder)
    }catch(err){res.status(500).json(err)}
})

// // Update
router.put("/:id", VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    

    try{
        //findind Order  in th DB by his id 
        const updateOrder = await Order.findByIdAndUpdate(req.params.id , {
            //setting what is in the body to the Order example:updating img
            $set: req.body
        }, {new:true})
        res.status(200).json(updateOrder)
    }catch (err) {res.status(500).json(err)}

});

// //Delete

router.delete("/:id", VerifyTokenAndAuthorization,async(req:Request, res:Response) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted successfully")
    }catch(err) {
        res.status(500).json(err)
    }
} );


// get user Order

router.get("/find/:userId", VerifyTokenAndAuthorization,async(req:Request, res:Response) => {
    try{
       
       const orders = await Order.find({userId: req.params.userId})
       res.status(200).json(orders  )
       
    }catch(err) {
        res.status(500).json(err)
    }
} );


// // //get all

router.get("/",  VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    try{
        const Orders = await Order.find();
        res.status(200).json(Orders)
    }catch (err){res.status(500).json(err)}
})

// GET MONTHLY INCOME 

router.get("/incocme",  VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1 ))

    try{
        const income = await Order.aggregate([
            {$match:{createdAt:{gte:previousMonth}}},
            {
                $project: {
                    month: {$month:"$createdAt"},
                    sales:"$amount",
                }},
                {
                    $group: {
                        _id: "$month",
                        total: {$sum : "$sales"}
                    },
            
            }
        ])
res.status(200).json(income)
    } catch (err) {res.status(500).json(err)}

})




module.exports = router