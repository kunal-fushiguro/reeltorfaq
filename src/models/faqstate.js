import { model, Schema } from "mongoose";

const faqStateSchema = new Schema({
  state: { type: String, required: true },
  faqData: [{ type: Schema.Types.ObjectId, ref: "questionsanswer" }],
});

const faqStateModel = model("faqState", faqStateSchema);

export { faqStateModel };
