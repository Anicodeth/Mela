import mongoose from "mongoose"

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
        donated_money: {
            type: Number,
            default: 0,
            required: [true, "Donated money is required"],
        },
        imageUrl: {
            type: String,
            required: [true, "Image is required"],
        },
        is_open: {
            type: Boolean,
            required: [true, "is_open is required"],
        },
        date_created: {
            type: Date,
            required: [true, "Date is required"],
        },
        creator_id: {
            type: String,
            required: [true, "Creator is required"],
        }
    });

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign
