import mongoose from "mongoose";

const Schema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })

export const Department = mongoose.model('Department', Schema)