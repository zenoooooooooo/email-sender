import { User } from "@/backend/models";
import bcrypt from "bcrypt";
export default async function registerUser(data: IUser) {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return {
        message: "Missing required fields",
        status: 400,
      };
    }
    
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return {
        message: "User already exists",
        status: 409,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
   
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return {
      message: "User registered successfully",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
}
