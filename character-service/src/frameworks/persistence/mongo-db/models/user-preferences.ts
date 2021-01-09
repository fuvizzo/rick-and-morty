import {
  model, Schema, Model, Document, Types,
} from 'mongoose';

export interface IMongoDbUserPreferencesDocument extends Document {
  userId: string
  favoriteCharacterIds: number[]
}

const userPreferencesSchema: Schema = new Schema({
  userId: { type: String, required: true },
  favoriteCharacterIds: { type: Array },
});

const MongoUserPreferences: Model<IMongoDbUserPreferencesDocument> = model(
  'UserPreferences',
  userPreferencesSchema,
);

export type IMongoUserPreferencesModel = typeof MongoUserPreferences;

export default MongoUserPreferences;
