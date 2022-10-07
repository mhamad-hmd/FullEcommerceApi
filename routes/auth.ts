
const router = require('express').Router();
import { Request, Response } from "express";
const bodyParser = require('body-parser');
const User = require('../models/Users');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

const jsonParser = bodyParser.json()

//register
router.post("/register", jsonParser, async (req: Request, res: Response) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        name:req.body.name,
        lastName:req.body.lastName,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
       
        const accessToken = jwt.sign({
            id: savedUser._id,
            isAdmin: savedUser.isAdmin,
        }, process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        res.status(201).json({savedUser, accessToken})
    } catch (err) {
        res.status(500).json(err)
    }

})


//Login

router.post("/login", async (req: Request, res: Response) => {

    try {
        // creating a user variable and this variable will check if theres a user wih the username that we get from the body
        const user = await User.findOne({ username: req.body.username });

        // returnin wrong credentials if user not found
        !user && res.status(401).json("Wrong Credentials!")

        // creating a hashPassowrd variable that stores the user variable hashed
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        //checking if User password is === to body password

        originalPassword !== req.body.password && 
        res.status(401).json("Wrong Credentials!");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500);
      }

})



module.exports = router