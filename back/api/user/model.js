/**
 * This file is the Schema for the User Model.
 * It includes all necessary methods and middleware
 * Password hashing and confrim password check
 * password checker
 */

// Require Mongoose
import mongoose from "mongoose";

// Require Validation
import validator from "validator"

//Require bcrypt
import bcrypt from "bcrypt"

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
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide an username"],
      maxlength: [50, "username can not exceed 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Please insert a password"],
      minlength: [8, "Password can not be less than 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is required"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Password and Password Confirm must be the same",
      },
    },
    socialMedia: {
      Twitter: String,
      Instagram: String,
      LinkedIn: String,
    },
    bio: String,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    passwordChangedAt: Date,

    image: {
      type: String,
      required: false,
    },

    imageCloudinaryPublicId: {
      type: String,
      required: false,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Create and export User Model
const User = mongoose.model("User", userSchema);

export default User;
