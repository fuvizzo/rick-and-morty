import {
  model,
  Schema,
  Model,
  Document,
} from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IAccount, IBasicInfo, RoleType,
} from '../../../../contracts/entities';

export interface IMongoDbAccountDocument extends Document {
  account: IAccount
  basicInfo: IBasicInfo
}

const accountSchema: Schema = new Schema({
  account: {
    email: { type: String, required: true },
    password: { type: String, required: true },
    disabled: { type: Boolean, required: true, default: false },
    roles: { type: Array, required: true, default: [RoleType.Customer] },
  },
  basicInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function hashPassword(this:any) {
  if (this) {
    const data = this.getUpdate() as IMongoDbAccountDocument;

    const salt: string = await bcrypt.genSalt(Number(process.env.ENCRYPTION_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(
      data.account.password,
      salt,
    );
    data.account.password = hashedPassword;
  }
}

accountSchema.pre('findOneAndUpdate', hashPassword);

const MongoAccount: Model<IMongoDbAccountDocument> = model('UserAccount', accountSchema);

export type IMongoAccountModel = typeof MongoAccount;

export default MongoAccount;
