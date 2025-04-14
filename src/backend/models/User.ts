import { Schema, models, model } from "mongoose"

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User = models.User || model<IUser>("User", UserSchema)
export default User