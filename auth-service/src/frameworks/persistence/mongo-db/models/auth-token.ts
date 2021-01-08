import {
  model,
  Schema,
  Model,
  Document,
} from 'mongoose';

const refreshTokenSchema: Schema = new Schema({ value: { type: String } });

const MongoRefreshToken: Model<Document> = model('RefreshToken', refreshTokenSchema);

export type IMongoRefreshToken = typeof MongoRefreshToken;

export default MongoRefreshToken;
