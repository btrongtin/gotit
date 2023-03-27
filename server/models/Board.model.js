import mongoose from "mongoose"
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Unnamed board'
    },
    user: {
        //this is uid created from firebase 
        type: String,
        required: true
    },
    colOrder: {
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
    accessByUsers: { //this id is uid created by firebase
        type: [String],
        default: [],
    }
});

// module.exports = mongoose.model("board", BoardSchema);
// module.exports = BudgetItemSchema;
const Board = mongoose.model("board", BoardSchema);
export default Board;

