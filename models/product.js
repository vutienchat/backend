import mongoose from 'mongoose';
const {ObjectId} =  mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    old_price: {
        type: Number,
        required: true
    },
    new_price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        default: false,
        // required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    classify: {
        type:Number
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    }
},{timestamps: true});
module.exports = mongoose.model('Product', productSchema);