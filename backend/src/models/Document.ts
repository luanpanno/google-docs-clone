import { Schema, model } from 'mongoose';

export interface Document {
  _id: string;
  data: Object;
}

const documentSchema = new Schema({
  _id: String,
  data: Object,
});

export const DocumentSchema = model<Document>('Document', documentSchema);
