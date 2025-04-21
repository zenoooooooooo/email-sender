interface IEmailHistory {
  user: string;
  type: "welcomeEmail" | "interviewInvitation" | "newsLetter" | "passwordReset";
  recipients: string[];
  name: string;
  payload: Record<string, any>;
}
