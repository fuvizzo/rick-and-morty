import mongoose, { Mongoose } from 'mongoose';

import IDatabaseService from '../../../contracts/database-service';

export default class MongoDbDatabaseService implements
  IDatabaseService {
  private client!: Mongoose;

  async initDatabase() {
    const mongooseOpts: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.client = await mongoose.connect(
      process.env.MONGO_URL as string,
      mongooseOpts,
    );
  }

  async closeConnection() {
    await this.client.connection.close();
  }
}
