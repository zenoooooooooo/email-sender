import { User } from "@/backend/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "@/types/IUser";
export default async function loginUser(data: Omit<IUser, "name">) {
  try {
    const { email, password } = data;
    if (!email || !password) {
      return {
        response: { message: "All fields are required. Please try again." },
        status: 400,
      };
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return {
        response: { message: "User not found. Invalid email." },
        status: 404,
      };
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return {
        response: {
          message: "Invalid password. Please try again.",
        },
        status: 401,
      };
    }

    const token = jwt.sign(
      { id: findUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    const name = findUser.name;

    return {
      message: "Logged in Successfully",
      token: token,
      name: name,
      status: 200,
    };
  } catch (error) {
    console.error("Error logging in user: ", error);
    return { message: "Internal Server Error", status: 500 };
  }
}
