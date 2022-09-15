import { NextFunction, Request, Response } from "express"

const jwt = require('jsonwebtoken')

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //storing user header in a variable
    const authHeader = req.headers.token;
    
    //checking if user's token is availabe
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err,user) => {  })
    }  
    else{

    }

}

