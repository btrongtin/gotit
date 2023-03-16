import mongoose from "mongoose"
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Unnamed board'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    colOrder: {
        type: [String],
        default: [],
    },
    labels: {
        type: [String],
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
});

// module.exports = mongoose.model("board", BoardSchema);
// module.exports = BudgetItemSchema;
const Board = mongoose.model("board", BoardSchema);
export default Board;

