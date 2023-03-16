import mongoose from "mongoose"
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    card: {
        type: Schema.Types.ObjectId,
        ref: "card",
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
});

const Comment = mongoose.model("comment", CommentSchema);
export default Comment;
