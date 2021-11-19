import { Request, Response } from 'express';
import { encValidate, generateToken } from "../services";
import { userModel } from "../models";

async function login(req: Request, res: Response) {
    console.log(">>>>>>>>>", req.body)
    let { mobile, password } = req.body;
    let userInfo = await userModel.find({ mobile }, []);
    if (!userInfo?.length)
        return res.status(404).send({
            message: 'user name or password isnot valid'
        });

    userInfo = userInfo[0];
    let isValid = await encValidate(password, userInfo.password)
    if (!isValid)
        return res.status(404).send({
            message: 'user name or password isnot valid'
        });

    let token = generateToken(userInfo)
    res.send({
        name: userInfo.name,
        balance: userInfo.balance,
        token
    })
}


export { login }