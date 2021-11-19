import { Router } from 'express';
const mainRoutes = Router();
import { register, login} from '../controllers'

mainRoutes.route('/')
    .get((req, res) => { res.send("welcome from get") })
    .post((req, res) => { res.send("welcome from post") });

mainRoutes.route('/register')
    .post(register)

mainRoutes.route('/login')
    .post(login)

module.exports = mainRoutes;