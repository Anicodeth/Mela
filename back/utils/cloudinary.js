/**
    
 */
import cloudinary from 'cloudinary'
import config from '../config.js'
cloudinary.v2

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.cl_apiKey,
  api_secret: config.cl_apiSecret,
});

export default cloudinary.v2;