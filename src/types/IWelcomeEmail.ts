import { IEmail } from "./IEmail";
export interface IWelcomeEmail extends IEmail {
  email: string;
  loginLink: string;
}
