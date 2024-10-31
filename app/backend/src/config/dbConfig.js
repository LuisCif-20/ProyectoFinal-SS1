const CONFIG = require("./config")

const { DB_USER, DB_PSWD, DB_NAME, DB_HOST, DB_PORT, DB_DIAL } = CONFIG.db;

module.exports = {
  "development": {
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": DB_DIAL,
    "username": DB_USER,
    "password": DB_PSWD,
    "database": DB_NAME
  },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
}
