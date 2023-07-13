/**
 * This file is the Schema for the User Model.
 * It includes all necessary methods and middleware
 * Password hashing and confrim password check
 * password checker
 */

// Require Mongoose
const mongoose = require("mongoose");

// Require Validation
const validator = require("validator");

//Require bcrypt
const bcrypt = require('bcrypt');


// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [50, "First name can not exceed 50 characters"],
      minlength: [3, "First name can not be less than 3 character"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [50, "Last name can not exceed 50 characters"],
      minlength: [3, "Last name can not be less than 3 character"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      maxlength: [50, "Last name can not exceed 50 characters"],
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    username:{
      type: String,
      unique: true,
      required: [true, "Please provide an username"],
      maxlength: [50, "username can not exceed 50 characters"],

    },
    password: {
      type: String,
      required: [true, "Please insert a password"],
      minlength: [8, "Password can not be less than 8 characters"],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is required"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Password and Password Confirm must be the same"
      }
    },
    socialMedia: {
        Twitter: String,
        Instagram: String,
        LinkedIn: String
    },
    bio: String,
    money: Number,
    likes: Number,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    passwordChangedAt: Date,

    image: {
      type: String,
      required: false
    },

    imageCloudinaryPublicId: {
      type: String,
      required: false
    },

  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);


// Hash the password
userSchema.pre("save", async function (next) {

  //check if password is modified or not
  if(!this.isModified('password')){
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  
  next();
});

//To check if password has been changed by comparing JWT iat and passwordChangedAt in user model
userSchema.method.checkPasswordChange = function(iat){
  if(this.passwordChangedAt){
    return iat < parseInt(this.passwordChangedAt.getTime()/1000,10) //converting date to integer as jwt iat is an integer
  }
  return false //if password hasn't been changed
}


// Create and export User Model
const User = mongoose.model("User", userSchema);

module.exports = User;