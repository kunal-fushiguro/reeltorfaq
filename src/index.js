import { connectDatabase } from "./db/index.js";
import { PORT } from "./env/index.js";
import express from "express";
import cors from "cors";
import { faqStateRouter } from "./routes/faqState.js";
import { faqSubLocalityRouter } from "./routes/faqSublocality.js";
import { questionAnswerRoutes } from "./routes/questionAnswer.js";

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  routes
app.use("/api/v1/faq-service", faqStateRouter);
app.use("/api/v1/faq-service", faqSubLocalityRouter);
app.use("/api/v1/faq-service", questionAnswerRoutes);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log("Server Started on PORT : " + PORT);
    });
  } catch (error) {
    console.error("Error : " + error);
  }
}

startServer();
