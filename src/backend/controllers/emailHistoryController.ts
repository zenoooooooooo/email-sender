import { EmailHistory, User } from "../models";

export default async function getEmailHistory(id: string) {
  try {
    if (!id) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    const user = await User.findById(id);
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    const emailHistory = await EmailHistory.find({ user: user.email });

    return {
      emailHistory,
      message: "Fetched Email History Successfully",
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
