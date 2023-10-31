import express from "express"
import cors from "cors"
import { env } from "./config/env"

import errorHandler from "./middlewares/errorHandler"

import { router as administratorRouter } from "./routers/administratorRouter"

// Database
import { connectDB } from "./database/connection"
connectDB(env.MONGODB_URL)

// Server
const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use("/administrator", administratorRouter)

// Error handling
app.use(errorHandler)

// Startup
const port = env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
