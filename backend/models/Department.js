import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Department = mongoose.model('Department', Schema)