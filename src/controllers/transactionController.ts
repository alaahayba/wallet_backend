import { Request, Response } from 'express';
import { transactionModel, userModel } from "../models";

async function transactionExecute(req: Request, res: Response) {
    let { destination, amount, userData } = req.body;

    //for check he is valid active or not
    let validDestinatin = await userModel.find({ mobile: destination }, [])
    if (!validDestinatin?.length)
        return res.status(404).send({
            message: 'user of mobile number is not exist'
        });

    transactionModel.transfer({ source: userData.mobile, destination, amount }).then((data) => {
        res.send({
            msessage: "transfer done successfult",
        })
    }).catch(error => {
        //balance isnot enough
        //or the transfered mobile not exist
        console.log("err", error.message)
        res.status(403).send({
            message: "fail to transfer",
            error: error.message
        });
    })
}

async function transactionList(req: Request, res: Response) {
    let { destination, userData, amount } = req.body
    let source = undefined
    if (userData)
         if (userData.mobile != destination) source = userData.mobile;
         else if (!destination) destination = userData.mobile;


    let filterData = {
        ...destination ? { destination } : {},
        ...source ? { source } : {},
        ...amount ? { amount } : {}
    }
    console.log(filterData)

    let data = await transactionModel.filter(filterData);
    res.send(data)
    return data;
}


export { transactionExecute, transactionList }