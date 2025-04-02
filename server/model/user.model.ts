import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  firstName?: string | null;
  lastName?: string | null;
  role: "admin" | "user";
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema <IUserDocument> (
  {
    firstName: { type: String, trim: true, default: null },
    lastName: { type: String, trim: true, default: null },
    role: { type: String, enum: ["admin", "user"], required: true },
  },
  { timestamps: true }
);



const User = mongoose.model<IUserDocument>("User", userSchema , "users");
export default User;
