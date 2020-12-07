import { connect } from 'mongoose';
import { config as dotConfig } from 'dotenv';
import { throwError } from '../utils/handleErrors';

dotConfig();

const { MONGODB_URI } = process.env;

export class Database {
  static async db() {
    try {
      const connection = await connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

      if (!connection) {
        throwError(500, 'Unable to connect to database');
      }
      console.log('Database connection successful!');
    } catch (err) {
      console.log('Database connection failed!');
    }
  }
}
