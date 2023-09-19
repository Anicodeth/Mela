import mongoose from "mongoose"
import Schema from "mongoose"

const donationSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    currency: String,
    amount: Number,
    charge: Number,
    mode: String,
    method: String,
    type: String,
    status: String,
    reference: String,
    tx_ref: String,
    comment: String,
    visibility:Boolean,
    customization: {
        title: String,
        description: String,
        logo: String,
    },
    meta: String,
    created_at: Date,
    updated_at: Date,
})

const campaignSchema = new mongoose.Schema(
    {title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        goal: {
            type: Number,
            default: 0,
            required: [true, "Goal is required"],
        },
        donatedMoney: {
            type: Number,
            default: 0,
            required: [true, "Donated money is required"],
        },
        donations:[donationSchema],
        imageUrl: {
            type: String,
            required: [true, "Image is required"],
        },
        isOpen: {
            type: Boolean,
            required: [true, "is_open is required"],
        },
        creatorId: {
            type: String,
            required: [true, "Creator is required"],
        },
        tags:{
            type: [],
        }
    },
    {timestamps: true}
    );

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign
