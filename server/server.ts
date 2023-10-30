import express from "express"
import cors from "cors"
import { env } from "./config/env"

// Database
import { connectDB } from "./database/connection"
connectDB(env.MONGODB_URL)

// Server
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
