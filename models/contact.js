import mongoose from 'mongoose';
const ContactSchema = mongoose.Schema({ 
       name: {
           type: String,
           required: true,
           maxLength: 32,
           trim: true
       },
       email: {
           type: String,
           required: true,
           trim: true,
           maxLength: 32,
       },
       content: {
           type: String,
           trim: true,
       },
       title:{
           type: String,
           trim: true,
       }
},{timestamps: true})
module.exports = mongoose.model('Contact',ContactSchema);