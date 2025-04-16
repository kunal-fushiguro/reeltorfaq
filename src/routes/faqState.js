import { Router } from "express";
import {
  createSingleStateFaq,
  deleteSingleStateFaq,
  getAllStateFaq,
  getSingleStateFaq,
  updateSingleStateFaq,
} from "../controllers/state.js";

const faqStateRouter = Router();

// state routes
faqStateRouter.get("/state/:statename", getSingleStateFaq);
faqStateRouter.get("/state", getAllStateFaq);
faqStateRouter.post("/state", createSingleStateFaq);
faqStateRouter.put("/state", updateSingleStateFaq);
faqStateRouter.delete("/state", deleteSingleStateFaq);

export { faqStateRouter };
