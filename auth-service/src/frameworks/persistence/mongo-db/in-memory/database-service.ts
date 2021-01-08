import mongoose, { Mongoose } from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';
import IDatabaseService from '../../../../contracts/database-service';

const mongoDb = new MongoMemoryServer();

export interface ITestIDatabaseService extends IDatabaseService {
  clearDatabase: () => void
}

class InMemoryMongoDbDatabaseService implements ITestIDatabaseService {
  private client!: Mongoose;

  async initDatabase() {
    const uri = await mongoDb.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    this.client = await mongoose.connect(uri, mongooseOpts);
  }

  async closeConnection() {
    await this.client.connection.close();
    await mongoDb.stop();
  }

  async clearDatabase() {
    const { collections } = this.client.connection.db;

    await Promise.all(Object.keys(collections).map(async (name:string) => {
      await this.client.connection.db.dropCollection(name);
    }));
  }
}

export default InMemoryMongoDbDatabaseService;
