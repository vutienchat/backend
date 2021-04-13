import mongoose from 'mongoose';
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    }
},{timestamps: true});
module.exports = mongoose.model('Category', categorySchema);