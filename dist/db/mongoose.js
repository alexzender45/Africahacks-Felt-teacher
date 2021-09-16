"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;

var _mongoose = require("mongoose");

var _dotenv = require("dotenv");

var _handleErrors = require("../utils/handleErrors");

(0, _dotenv.config)();
const {
  MONGODB_URI
} = process.env;

class Database {
  static async db() {
    try {
      const connection = await (0, _mongoose.connect)(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

      if (!connection) {
        (0, _handleErrors.throwError)(500, 'Unable to connect to database');
      }

      console.log('Database connection successful!');
    } catch (err) {
      console.log('Database connection failed!');
    }
  }

}

exports.Database = Database;
//# sourceMappingURL=mongoose.js.map