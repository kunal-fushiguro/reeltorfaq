import { faqStateModel } from "../models/faqstate.js";
import { ErrorResposne, SuccessResposne } from "../utils/response.js";

//  get all state FAQ
export async function getAllStateFaq(_, res) {
  try {
    const allStateDocs = await faqStateModel.find({}, "_id state");
    res.status(200).json(
      new SuccessResposne(200, "Fetched all states successfully.", true, {
        states: allStateDocs,
      })
    );
  } catch (error) {
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  get single state FAQ
export async function getSingleStateFaq(req, res) {
  try {
    const stateName = req.params["statename"];

    if (!stateName) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "statename is required", false));
    }

    const stateData = await faqStateModel
      .findOne({ state: stateName })
      .populate("faqData");

    if (!stateData) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "State FAQ not found", false));
    }

    return res.status(200).json(
      new SuccessResposne(200, "State FAQ fetched successfully.", true, {
        stateData,
      })
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ErrorResposne(500, "Internal Error", false));
  }
}
//  create single state for FAQ
export async function createSingleStateFaq(req, res) {
  try {
    const { state } = req.body;

    if (!state) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "State name is required", false));
    }

    // Check if state already exists
    const existingState = await faqStateModel.findOne({ state });
    if (existingState) {
      return res
        .status(409)
        .json(new ErrorResposne(409, "State already exists", false));
    }

    const newState = await faqStateModel.create({ state });

    res.status(201).json(
      new SuccessResposne(201, "State created successfully", true, {
        state: newState,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}

// update single state for FAQ
export async function updateSingleStateFaq(req, res) {
  try {
    const { newStateName, id } = req.body;

    if (!id || !newStateName) {
      return res
        .status(400)
        .json(
          new ErrorResposne(
            400,
            "ID and updated state name are required",
            false
          )
        );
    }

    const updated = await faqStateModel.findByIdAndUpdate(
      id,
      { state: newStateName },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json(new ErrorResposne(404, "State not found", false));
    }

    res.status(200).json(
      new SuccessResposne(200, "State updated successfully", true, {
        updated,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}

// task : how to delete an FAQ of state as well when state is deleted
//  delete single state for FAQ
export async function deleteSingleStateFaq(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json(new ErrorResposne(400, "ID is required", false));
    }

    const deleted = await faqStateModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json(new ErrorResposne(404, "State not found", false));
    }

    res.status(200).json(
      new SuccessResposne(200, "State deleted successfully", true, {
        deleted,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ErrorResposne(500, "Internal Error", false));
  }
}
