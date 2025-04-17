import { faqSubLocalityModel } from "../models/faqSubLocality.js";
import { ErrorResposne, SuccessResposne } from "../utils/response.js";

//  get all sub locality of particular state
export async function getAllSubLocalityStateFaq(req, res) {
  try {
    const state = req.params["statename"];
    const data = await faqSubLocalityModel
      .find({ state })
      .select("sub_localities _id");
    res
      .status(200)
      .json(new SuccessResposne(200, "Fetched sub-localities", true, data));
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}

// get single sub locality FAQ
export async function getSingleSubLocalityFaq(req, res) {
  try {
    const sublocalityname = req.params["sublocalityname"];
    const sub = await faqSubLocalityModel
      .findOne({ sub_localities: sublocalityname })
      .populate("faqData");

    if (!sub) {
      return res.status(404).json(new ErrorResposne(404, "Not found", false));
    }

    res.status(200).json(new SuccessResposne(200, "Fetched FAQ", true, sub));
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}

//  create single sub locality FAQ
export async function createSingleSubLocalityFaq(req, res) {
  try {
    const { state, sub_localities } = req.body;
    if (!state || !sub_localities) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "Required fields missing", false));
    }

    const existing = await faqSubLocalityModel.findOne({
      state,
      sub_localities,
    });
    if (existing) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "Sub-locality already exists", false));
    }

    const created = await faqSubLocalityModel.create({
      state,
      sub_localities,
      faqData: [],
    });
    res
      .status(201)
      .json(
        new SuccessResposne(201, "Created sub-locality FAQ", true, created)
      );
  } catch (error) {
    res
      .status(500)
      .json(new ErrorResposne(500, "Internal Server Error", false));
  }
}

// update single sub locality FAQ
export async function updateSingleSubLocalityFaq(req, res) {
  try {
    const { id, state, sub_localities } = req.body;
    if (!id || !state || !sub_localities) {
      return res
        .status(400)
        .json(
          new ErrorResposne(
            400,
            "ID ,state and sub_localities name are required",
            false
          )
        );
    }

    const updated = await faqSubLocalityModel.findByIdAndUpdate(
      id,
      { state, sub_localities },
      { new: true }
    );

    res
      .status(200)
      .json(new SuccessResposne(200, "Updated successfully", true, updated));
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}

// task : how to delete an FAQ of sublocality as well when sub locality is deleted
// delete single sub locality FAQ
export async function deleteSingleSubLocalityFaq(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "ID is required", false));
    }

    const deleted = await faqSubLocalityModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json(new ErrorResposne(404, "sub_localities not found", false));
    }

    res.status(200).json(
      new SuccessResposne(200, "sub_localities deleted successfully", true, {
        deleted,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
