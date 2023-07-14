require('dotenv').config()
const bodyParser = require('body-parser');
import * as express from "express"
import sequelize from "../models"
import contacts from '../routes/changed.server.routes'
import { checkPassword } from "./password"
const cors = require('cors')

module.exports.init = async () => {
  //initialize app
  var app = express();

  // Allow all origins
  app.use(cors({
    origin: '*'
  }))

  await sequelize.sync({ alter: true })

  //enable request logging for development debugging
  //app.use(morgan('dev'));

  //check for auth
  // app.use(checkPassword);

  //body parsing middleware
  app.use(bodyParser.json());

  //routers
  app.use('/api/contacts', contacts);
  return app;
};
