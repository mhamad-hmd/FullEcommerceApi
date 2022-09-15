import { NextFunction, Request, Response } from "express"
import { IGetUserAuthInfoRequest } from "../requestDefinition"

const jwt = require('jsonwebtoken')

const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //storing user header in a variable
    const authHeader = <string> req.headers.token;
    
    
    //checking if user's token is availabe
    if(authHeader){
        const token =  authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err:Error,user:object) => { 
            if(err) res.status(403).json("Token not valid")
            req.user = user;
            next()
         })
    }  
    else{
        return res.status(401).json("Your not authenticated!")
    }

}

const VerifyTokenAndAuthorization = (req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) => {
    verifyToken(req, res, () => {
        //we are checkin if the user id is equal to the one in the params or if the users id admin 
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("your not allowed to do that")
        }
    })
};

const VerifyTokenAndAdmin = (req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) => {
    verifyToken(req, res, () => {
        //we are checkin if the user id is equal to the one in the params or if the users id admin 
        if( req.user.isAdmin){
            next()
        }else{
            res.status(403).json("your not allowed to do that")
        }
    })
}


module.exports = {verifyToken, VerifyTokenAndAuthorization, VerifyTokenAndAdmin};
