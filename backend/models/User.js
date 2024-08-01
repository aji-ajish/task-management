import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    image: {
        type: String
    },
    status: {
        type: Number,
        default: 1,
    },
}, { timestamps: true })

export const User = mongoose.model('User', Schema)