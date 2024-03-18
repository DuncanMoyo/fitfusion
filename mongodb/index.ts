// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if (!MONGODB_URI) throw new Error("Cannot connect to MongoDB");

//   cached.promise =
//     cached.promise ||
//     mongoose.connect(MONGODB_URI, {
//       dbName: "FitFusion",
//       bufferCommands: false,
//     });

//   cached.conn = await cached.promise;

//   return cached.conn;
// };

import mongooseLib from "mongoose";

const mongoDBUrl = process.env.MONGODB_URI;

let mongoCache = (global as any).mongoose || {
  connection: null,
  connectionPromise: null,
};

export const establishDatabaseConnection = async () => {
  if (mongoCache.connection) {
    console.log("Using cached database connection");
    return mongoCache.connection;
  }

  if (!mongoDBUrl) {
    throw new Error("Cannot connect to MongoDB. MONGODB_URI is not set.");
  }

  if (!mongoCache.connectionPromise) {
    console.log("Creating new database connection");
    const options = {
      dbName: "FitFusion",
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoCache.connectionPromise = mongooseLib
      .connect(mongoDBUrl, options)
      .then((mongoose) => {
        console.log("Database connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("Database connection error:", err);
        throw err;
      });
  }

  mongoCache.connection = await mongoCache.connectionPromise;
  return mongoCache.connection;
};
