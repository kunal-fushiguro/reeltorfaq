import {
  faqStateModel,
  faqSubLocalityModel,
  questionAnswerModel,
} from "../models/questionAnswer.js";
import { ErrorResposne, SuccessResposne } from "../utils/response.js";

// get single faq
export async function getSingleFaq() {
  try {
  } catch (error) {}
}
//  create single faq for sub locality
export async function createSingleSublocalityFaq(req, res) {
  try {
    const { question, answer, sublocality } = req.body;
    if (!question || !answer || !sublocality) {
      res
        .status(400)
        .json(new ErrorResposne(400, "All fields are required", false));
    }
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  create single faq for state
export async function createSingleStateFaq(req, res) {
  try {
    const { question, answer, state } = req.body;
    if (!question || !answer || !state) {
      res
        .status(400)
        .json(new ErrorResposne(400, "All fields are required", false));
      return;
    }

    const findState = await faqStateModel.findOne({ state: state });
    if (!findState) {
      res.status(400).json(new ErrorResposne(400, "State not found", false));
      return;
    }

    const newFaq = await questionAnswerModel.create({
      question: question,
      answer: answer,
      locationId: findState._id,
    });

    await faqStateModel.findByIdAndUpdate(
      findState._id,
      { $push: { faqData: newFaq._id } },
      { new: true }
    );

    res.status(201).json(
      new SuccessResposne(201, "FAQ created successfully.", true, {
        question: newFaq.question,
        answer: newFaq.answer,
        locationId: newFaq.locationId,
        _id: newFaq._id,
      })
    );
    return;
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  update single faq
export async function updateSingleFaq() {
  try {
    const { question, answer, sub_localities } = req.body;
    if (!question || !answer || !sub_localities) {
      res
        .status(400)
        .json(new ErrorResposne(400, "All fields are required", false));
      return;
    }

    const findSubLocalities = await faqSubLocalityModel.findOne({
      sub_localities: sub_localities,
    });
    if (!findState) {
      res.status(400).json(new ErrorResposne(400, "State not found", false));
      return;
    }

    const newFaq = await questionAnswerModel.create({
      question: question,
      answer: answer,
      locationId: findState._id,
    });

    res.status(201).json(
      new SuccessResposne(201, "FAQ created successfully.", true, {
        question: newFaq.question,
        answer: newFaq.answer,
        locationId: newFaq.locationId,
        _id: newFaq._id,
      })
    );
    return;
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  delete single faq
export async function deleteSingleFaq() {
  try {
  } catch (error) {}
}
