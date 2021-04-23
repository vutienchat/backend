import mongoose from 'mongoose';
const orderSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
    },
    total: {
        type: Number,
    }
},{timestamps:true})
module.exports = mongoose.model("Order",orderSchema);