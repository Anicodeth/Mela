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

// User Schema
const likeSchema = new mongoose.Schema(
  {
    
    campaign: {
      type: mongoose.Schema.ObjectId,
      ref: "Campaign",
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    timestamps: {
        type: Date.now()
    }
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);

// Create and export Like Model
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
