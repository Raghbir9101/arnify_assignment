import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { UserInterface } from "./user.model";

export interface BlogInterface {
  title: string;
  category: string;
  content: string;
  image: string;
  user: ObjectId | UserInterface;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
}, { timestamps: true });

const Blog = mongoose.model<BlogInterface & Document>("blog", blogSchema);
export default Blog;
