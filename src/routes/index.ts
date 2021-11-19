import { Router } from 'express';
const routes = Router();

routes.use('/',require("./main"))
routes.use('/admin',require("./admin"))
routes.use('/user',require("./user"))

export default routes;
