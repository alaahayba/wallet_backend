import { Request, Response } from 'express';
import { encryption } from "../services";
import { userModel, transactionModel } from "../models";

async function register(req: Request, res: Response) {
    let { name, mobile, password } = req.body;
    let userInfo = await userModel.find({ mobile }, []);
    if (userInfo?.length)
        return res.status(405).send({
            message: 'mobile is used'
        });

    //encryptPw
    let encryptedPW = await encryption(password);
    //save info in user table
    await userModel.save({ name, mobile, password: encryptedPW, balance: 0 })
    //deposite 
    let { depositeResult } = await transactionModel.deposit({ destination: mobile, amount: 1000 });
    res.send({ name, mobile, balance: depositeResult.balance })
}


export { register }