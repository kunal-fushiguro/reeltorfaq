import express from "express";
import cors from "cors";
import { routes } from "./routes/index.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  routes
app.use("/api/v1/faq-service", routes);

export { app };
