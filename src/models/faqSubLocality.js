import { model, Schema } from "mongoose";

const faqSubLocalitySchema = new Schema({
  state: { type: String, required: true },
  sub_localities: { type: String, required: true },
  faqData: [{ type: Schema.Types.ObjectId, ref: "questionsanswer" }],
});

const faqSubLocalityModel = model("faqSubLocality", faqSubLocalitySchema);

export { faqSubLocalityModel };
