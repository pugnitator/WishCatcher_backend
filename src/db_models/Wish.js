import mongoose from "mongoose";

const Wish = new mongoose.Schema({
    name: {type: 'String', required: true},
    state: {type: 'String', 
        enum: {
            values: ['free', 'reserved', 'presented'],
            message: `{VALUE} is not supported`,
        },
        default: 'free',
        // required: true,
    },
    giftURL: {type: 'String'},
    comment: {type: 'String'},
    tags: [String],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export default mongoose.model('Wish', Wish);