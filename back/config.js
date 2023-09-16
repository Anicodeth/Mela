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
  
  cl_apiSecret: process.env.CLOUD_API_SECRET,

  chapa_secret_key: process.env.CHAPA_SECRET_KEY,
  firebaseConfig:{
    apiKey: "AIzaSyCrAIDdlaigpB8jq_sWmfCUZwr5r1_BXfc",
    authDomain: "chatverse-56687.firebaseapp.com",
    projectId: "chatverse-56687",
    storageBucket: "chatverse-56687.appspot.com",
    messagingSenderId: "871300475560",
    appId: "1:871300475560:web:f38bd7a0905f547f55709d"
  },
};

export default config;
