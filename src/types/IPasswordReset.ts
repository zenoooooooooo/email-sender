import { IEmail } from "./IEmail";
export interface IPasswordReset extends IEmail {
    resetLink: string;
}