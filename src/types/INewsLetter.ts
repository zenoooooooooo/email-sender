import { months } from "@/enums/months";
import { IEmail } from "./IEmail";
export interface INewsLetter extends IEmail {
  month: months;
  headline: string;
  content: string;
  unsubscribeLink: string;
  author: string;
}
