import {
  model, Schema, Model, Document, Types,
} from 'mongoose';
import { IAddress, IUser, IUserInfo } from '../../../../contracts/entities';

type MongoObjectId = Types.ObjectId

export interface IMongoDbUserDocument extends Document {
  address: IAddress
  phoneNumber: string
  userId: string
}

const userSchema: Schema = new Schema({
  userId: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    streetNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  phoneNumber: { type: String, required: true },
});

export class User implements IUser<MongoObjectId> {
  address: IAddress;

  phoneNumber: string;

  id: MongoObjectId;

  constructor(id:MongoObjectId, userInfo:IUserInfo) {
    this.id = id;
    this.address = userInfo.address;
    this.phoneNumber = userInfo.phoneNumber;
  }
}

const MongoUser: Model<IMongoDbUserDocument> = model('User', userSchema);

export type IMongoUserModel = typeof MongoUser;

export default MongoUser;
