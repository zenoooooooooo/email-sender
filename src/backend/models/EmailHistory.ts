import { Schema, model, models } from "mongoose";
import { IEmailHistory } from "@/types/IEmailHistory";
const EmailHistorySchema = new Schema<IEmailHistory>(
  {
    user: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "welcomeEmail",
        "interviewInvitation",
        "newsLetter",
        "passwordReset",
      ],
      required: true,
    },
    recipients: {
      type: [String],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const EmailHistory =
  models.EmailHistory ||
  model<IEmailHistory>("EmailHistory", EmailHistorySchema);
export default EmailHistory;
