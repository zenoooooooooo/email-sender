import { EmailHistory } from "../models";

export default async function getEmailHistory(user: string) {
  try {
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    const emailHistory = await EmailHistory.find({ user });

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
