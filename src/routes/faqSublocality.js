import { Router } from "express";
import {
  createSingleSubLocalityFaq,
  deleteSingleSubLocalityFaq,
  getAllSubLocalityStateFaq,
  getSingleSubLocalityFaq,
  updateSingleSubLocalityFaq,
} from "../controllers/sublocality.js";

const faqSubLocalityRouter = Router();

// sub locality routes
faqSubLocalityRouter.get(
  "/sublocality/:sublocalityname",
  getSingleSubLocalityFaq
);
faqSubLocalityRouter.get(
  "/sublocality/state/:statename",
  getAllSubLocalityStateFaq
);
faqSubLocalityRouter.post("/sublocality", createSingleSubLocalityFaq);
faqSubLocalityRouter.put("/sublocality", updateSingleSubLocalityFaq);
faqSubLocalityRouter.delete("/sublocality", deleteSingleSubLocalityFaq);

export { faqSubLocalityRouter };
