import { validateToken } from "../services";
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            requestTime: number
        }

    }
}

var requestTime = function (req: Request, res: Response, next: NextFunction) {
    console.log(new Date().toISOString(), ":", req.url, "body", req.body);
    req.requestTime = Date.now()
    next()
}


function validateUser(req: Request, res: Response, next: NextFunction) {
    if (!req.header('token'))
        return res.status(401).send({
            message: 'no token exist'
        });
    let userData = validateToken(req.header('token') as string);
    if (!userData)
        return res.status(401).send({
            message: 'token not valid'
        });
    req.body = { ...req.body, userData };
    next();

}

function validateAdmin(req: Request, res: Response, next: NextFunction) {
    console.log("Admin validate")
    next()
}


function unhandeledCrashes(error: any, req: Request, res: Response, next: NextFunction) {
    console.log("your server got error", error);
    return res.status(500).send({
        message: 'somthing went wrong'
    });
}

function enableCors(error: any, req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      
}

export { requestTime, validateUser, validateAdmin, unhandeledCrashes , enableCors}