import dotenv from "dotenv"
dotenv.config()

import * as z from "zod"

// Schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  // Port is optional and is transformed to a number
  PORT: z.string().min(1).optional().transform(Number),
  MONGODB_URL: z.string().url(),
})

// Validation of the environment variables
export const env = envSchema.parse(process.env)
