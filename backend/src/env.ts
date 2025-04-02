import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "localhost:27017",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
