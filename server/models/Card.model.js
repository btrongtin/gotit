import mongoose from "mongoose"
import {CommentSchema} from "./Comment.model.js"
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: "column",
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: "board",
    },
    status: {
        type: String,
        enum: ["to-do", "in progress", "done"],
        default: "to-do",
    },
    type: {
        type: String,
        enum: ["personal", "work", "study"],
        default: "personal",
    },
    description: {
        type: String,
        default: ""
    },
    priority: {
        type: String,
        enum: ["P1", "P2", "P3"],
        default: "P3",
    },
    labels: {
        type: [Object],
        default: []
    },
    startDate: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    comments: {
        type: [CommentSchema],
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    _destroy: {
        type: Boolean,
        default: false,
    },
    remindAt: {
        type: Date,
        default: Date.now,
    },
    remind: {
        type: Boolean,
        default: false
    }
});

const Card = mongoose.model("card", CardSchema);
export default Card;
