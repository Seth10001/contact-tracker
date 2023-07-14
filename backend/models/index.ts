'use strict';
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
const { globSync } = require("glob")

const env = process.env.NODE_ENV || 'development';
import configs = require("../config/config")
const config = configs[env]
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    operatorsAliases
  }
)
// Add all models
const files = globSync(__dirname + "/**/*.js", { nonull: true })
const models = files
  .filter((file) => file !== __dirname + "/index.js")
  .map(file => require(file).default);
console.log(models)
sequelize.addModels(models)

export default sequelize
