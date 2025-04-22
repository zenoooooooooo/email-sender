import { Schema, models, model } from "mongoose";
import { IUser } from "@/types/IUser";
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
