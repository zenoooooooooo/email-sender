import { Schema, model, models } from "mongoose";

const EmailHistorySchema = new Schema<IEmailHistory>(
  {
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
