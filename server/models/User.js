import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    accessBoard: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
});

const User = mongoose.model('user', UserSchema);
export default User;
