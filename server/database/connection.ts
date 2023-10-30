import mongoose from "mongoose"

export async function connectDB(url: string) {
  mongoose.connect(url).then(() => console.log("DB connected"))
}
