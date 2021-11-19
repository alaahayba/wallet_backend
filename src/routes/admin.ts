import { Router } from 'express';
const adminRoutes = Router();
import { transactionList } from '../controllers'

adminRoutes.route('/')
    .get((req, res) => { res.send("welcome from  adminRoutes get") })
    .post((req, res) => { res.send("welcome from adminRoutes post") });

adminRoutes.route('/transaction/list')
    .post(transactionList)

module.exports = adminRoutes;