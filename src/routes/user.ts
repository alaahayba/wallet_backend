import { Router } from 'express';
const userRoutes = Router();
import { transactionList, transactionExecute } from '../controllers'

userRoutes.route('/')
    .get((req, res) => { res.send("welcome from  userRoutes get") })
    .post((req, res) => { res.send("welcome from userRoutes post") });

userRoutes.route('/transaction/execute')
    .post(transactionExecute)

userRoutes.route('/transaction/list')
    .post(transactionList)

module.exports = userRoutes;