import express from 'express';
const cors = require('cors')
import routes from './routes';
import { validateUser ,validateAdmin,unhandeledCrashes,enableCors} from './middlewares';
const morgan = require('morgan');

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(morgan('tiny'));
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(unhandeledCrashes);
    this.server.use(/^\/user.+$/, validateUser);
    this.server.use(/^\/admin.+$/, validateAdmin);
    //this.server.use(enableCors);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;