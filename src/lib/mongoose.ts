
import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB_URL!;
const DB_NAME = 'erp_database';


let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });

    isConnected = connection.readyState === 1;
    console.log(` MongoDB connected to database: ${DB_NAME}`);
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
