import {
  model,
  Schema,
  Model,
  Document,
} from 'mongoose';

export interface IMongoDbRefreshTokenDocument extends Document {
  userName: string
  value: string
}

const refreshTokenSchema: Schema = new Schema({
  userName: { type: String, required: true },
  value: { type: String, required: true },
});

const MongoRefreshToken = model<IMongoDbRefreshTokenDocument>('RefreshToken', refreshTokenSchema);

export type IMongoRefreshToken = typeof MongoRefreshToken;

export default MongoRefreshToken;
