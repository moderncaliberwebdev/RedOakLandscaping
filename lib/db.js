import mongoose from 'mongoose'

// Reuse the connection across serverless invocations
let cached = global.mongoose || (global.mongoose = { conn: null, promise: null })

export default async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }
  return cached.conn
}
