import { app } from "./app.js";
import { connectDatabase } from "./db/index.js";
import { PORT } from "./env/index.js";

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
