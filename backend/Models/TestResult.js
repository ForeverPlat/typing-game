import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    wpm: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }

}, { timestamps: true });

export default mongoose.model('TestResult', testResultSchema);