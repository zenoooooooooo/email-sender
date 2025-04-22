import { IEmail } from "./IEmail";
export interface IInterviewInvitation extends IEmail {
  position: string;
  company: string;
  companyDescription: string;
  interviewDate: string;
  interviewTime: string;
  interviewLocation: string;
  interviewNotes: string;
  contactMethod: string;
  contactLink: string;
  departmentName: string;
  contactPhone: string;
  contactEmail: string;
}
