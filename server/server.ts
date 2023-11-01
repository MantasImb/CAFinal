import express from "express";
import cors from "cors";
import { env } from "./config/env";

import errorHandler from "./middlewares/errorHandler";

import { router as administratorRouter } from "./routers/administratorRouter";
import { router as organisationRouter } from "./routers/organisationRouter";

// Database
import { connectDB } from "./config/dbConnection";
connectDB(env.MONGODB_URL);

// Server
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/administrator", administratorRouter);
app.use("/api/organisation", organisationRouter);

// Error handling
app.use(errorHandler);

// Startup
const port = env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
