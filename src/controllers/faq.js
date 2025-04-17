import { questionAnswerModel } from "../models/questionAnswer.js";
import { faqStateModel } from "../models/faqstate.js";
import { faqSubLocalityModel } from "../models/faqSubLocality.js";
import { ErrorResposne, SuccessResposne } from "../utils/response.js";

// get single faq
export async function getSingleFaq(req, res) {
  try {
    const id = req.params["faqid"];
    if (!id) {
      res.status(400).json(new ErrorResposne(400, "FAQ id is required", false));
      return;
    }

    const findFaq = await questionAnswerModel.findById(id);
    if (!findFaq) {
      res.status(400).json(new ErrorResposne(400, "FAQ not found", false));
      return;
    }

    res.status(200).json(
      new SuccessResposne(200, "FAQ fetched successfully.", true, {
        question: findFaq.question,
        answer: findFaq.answer,
        locationId: findFaq.locationId,
        _id: findFaq._id,
      })
    );
    return;
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  create single faq for sub locality FAQ
export async function createSingleSublocalityFaq(req, res) {
  try {
    const { question, answer, subLocality } = req.body;
    if (!question || !answer || !subLocality) {
      res
        .status(400)
        .json(new ErrorResposne(400, "All fields are required", false));
      return;
    }

    const sub_localities = await faqSubLocalityModel.findOne({
      sub_localities: subLocality,
    });
    if (!sub_localities) {
      res
        .status(400)
        .json(new ErrorResposne(400, "Sub locality not found", false));
      return;
    }

    const newFaq = await questionAnswerModel.create({
      question: question,
      answer: answer,
      locationId: sub_localities._id,
    });

    await faqSubLocalityModel.findByIdAndUpdate(
      sub_localities._id,
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
//  create single faq for state
export async function createSingleStateFaq(req, res) {
  try {
    const { question, answer, stateName } = req.body;
    if (!question || !answer || !stateName) {
      res
        .status(400)
        .json(new ErrorResposne(400, "All fields are required", false));
      return;
    }

    const findState = await faqStateModel.findOne({ state: stateName });
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
export async function updateSingleFaq(req, res) {
  try {
    const { question, answer, id } = req.body;
    if (!question || !answer || !id) {
      res
        .status(400)
        .json(new ErrorResposne(400, "All fields are required", false));
      return;
    }

    const findFaq = await questionAnswerModel.findByIdAndUpdate(
      id,
      {
        answer: answer,
        question: question,
      },
      { new: true }
    );
    if (!findFaq) {
      res.status(400).json(new ErrorResposne(400, "FAQ not found", false));
      return;
    }

    res.status(200).json(
      new SuccessResposne(200, "FAQ updated successfully.", true, {
        question: findFaq.question,
        answer: findFaq.answer,
        locationId: findFaq.locationId,
        _id: findFaq._id,
      })
    );
    return;
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  delete single faq for state and sublocality
export async function deleteSingleFaq(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "ID is required", false));
    }

    const deleted = await questionAnswerModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json(new ErrorResposne(404, "FAQ not found", false));
    }

    res.status(200).json(
      new SuccessResposne(200, "FAQ deleted successfully", true, {
        deleted,
      })
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ErrorResposne(500, "Internal Error", false));
  }
}
