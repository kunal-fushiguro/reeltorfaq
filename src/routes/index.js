import { Router } from "express";
import {
  createSingleFaq,
  createSingleStateFaq,
  createSingleSubLocalityFaq,
  deleteSingleFaq,
  deleteSingleStateFaq,
  deleteSingleSubLocalityFaq,
  getAllStateFaq,
  getAllSubLocalityStateFaq,
  getSingleFaq,
  getSingleStateFaq,
  getSingleSubLocalityFaq,
  updateSingleFaq,
  updateSingleStateFaq,
  updateSingleSubLocalityFaq,
} from "../controllers/index.js";

const routes = Router();

//  test route
routes.get("/", testroute);
// state routes
routes.get("/state/:statename", getSingleStateFaq);
routes.get("/state", getAllStateFaq);
routes.post("/state", createSingleStateFaq);
routes.put("/state", updateSingleStateFaq);
routes.delete("/state", deleteSingleStateFaq);
// sub locality routes
routes.get("/sublocality/:sublocalityname", getSingleSubLocalityFaq);
routes.get("/sublocality/state/:statename", getAllSubLocalityStateFaq);
routes.post("/sublocality", createSingleSubLocalityFaq);
routes.put("/sublocality", updateSingleSubLocalityFaq);
routes.delete("/sublocality", deleteSingleSubLocalityFaq);
// FAQ
routes.get("/faq/:faqid", getSingleFaq);
routes.post("/faq/state", createSingleStateFaq);
routes.post("/faq/sublocality", createSingleSubLocalityFaq);
routes.put("/faq/:id", updateSingleFaq);
routes.delete("/faq/:id", deleteSingleFaq);

export { routes };
