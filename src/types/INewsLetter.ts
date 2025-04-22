import { months } from "@/enums/months";

export interface INewsLetter extends IEmail {
  month: months;
  headline: string;
  content: string;
  unsubscribeLink: string;
  author: string;
}
