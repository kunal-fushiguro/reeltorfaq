import { model, Schema } from "mongoose";

const questionAnswerSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
  },
});

const questionAnswerModel = model("questionsanswer", questionAnswerSchema);

export { questionAnswerModel };
