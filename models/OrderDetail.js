import mongoose from 'mongoose';
const {ObjectId} =  mongoose.Schema;
const OrderDetailSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     maxLength: 32,
    //     required: true,
    //     trim: true
    // }
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    orderId: {
        type: ObjectId,
        required: true,
        ref: 'Order'
    },
    quantity: {
        type: String,
        required: true
    },
    intomoney: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('OrderDetail', OrderDetailSchema);