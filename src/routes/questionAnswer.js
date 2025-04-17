import { Router } from "express";
import {
  createSingleStateFaq,
  createSingleSublocalityFaq,
  deleteSingleFaq,
  getSingleFaq,
  updateSingleFaq,
} from "../controllers/faq.js";

const questionAnswerRoutes = Router();
// FAQ
questionAnswerRoutes.get("/faq/:faqid", getSingleFaq);
questionAnswerRoutes.post("/faq/state", createSingleStateFaq);
questionAnswerRoutes.post("/faq/sublocality", createSingleSublocalityFaq);
questionAnswerRoutes.put("/faq", updateSingleFaq);
questionAnswerRoutes.delete("/faq", deleteSingleFaq);
export { questionAnswerRoutes };
