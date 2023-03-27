import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: "board",
    },
    cardOrder: {
        type: [String],
        default: [],
    },
    createdAt: {
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

const Column = mongoose.model("column", ColumnSchema);
export default Column;
