// creating config object for all variable

//Get dotenv
import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  db: {
    remote: process.env.DB_REMOTE,
  },
  PORT: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  
  cloud_name : process.env.CLOUD_NAME,

  cl_apiKey : process.env.CLOUD_API_KEY,
  
  cl_apiSecret: process.env.CLOUD_API_SECRET
};

export default config;
