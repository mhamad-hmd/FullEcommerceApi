
const router = require('express').Router();
import { Request, Response } from "express";
const bodyParser = require('body-parser')
const {verifyToken,VerifyTokenAndAuthorization, VerifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require("crypto-js");
const User = require('../models/Users');



const jsonParser = bodyParser.json()

//Update

router.put("/:id",verifyToken, async(req:Request, res:Response) => {
    if (req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try{
        //findind user in th DB by his id 
        const updateUser = await User.findByIdAndUpdate(req.params.id , {
            //setting what is in the body to the user example:updating username
            $set: req.body
        }, {new:true})
        res.status(200).json(updateUser)
    }catch (err) {res.status(500).json(err)}
})  

//Delete


router.delete("/:id", VerifyTokenAndAuthorization,async(req:Request, res:Response) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted successfully")
    }catch(err) {
        res.status(500).json(err)
    }
} );

//get user

router.get("/find/:id", verifyToken ,async(req:Request, res:Response) => {
    try{
       
       const user= await User.findById(req.params.id)
       const { password, ...others } = user._doc;
       res.status(200).json({...others})
       
    }catch(err) {
        res.status(500).json(err)
    }
} );


//get all users

router.get("/", VerifyTokenAndAdmin,async(req:Request, res:Response) => {
    try{
        //creating a query '?'
    const query = req.query.new
    //if theres a query we return 5 latest users, if not return all users
       const users= query ? await User.find().sort({_id:-1}).limit(1) : await User.find();
       
       //responding with users
       res.status(200).json(users)
       
    }catch(err) {
        res.status(500).json(err)
    }
} );


//get user stats

router.get("/stats", VerifyTokenAndAdmin,async(req:Request, res:Response) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
        
    try{
    const data = await User.aggregate([
        //matching all the users that are created from lastyear till now
        {$match : {createdAt: {$gte:lastYear}}},

        // getting the month that the user got created at
        {$project: {
            month: {$month: "$createdAt"}
        }
        },
        
        //grouping all the users created at each month
        {$group:{
            _id:"$month",
             total: {$sum : 1}
             }}
    ])
       
    res.status(200).json(data)
    }catch(err) {
        res.status(500).json(err)
    }
} );



module.exports = router

