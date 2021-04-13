import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import productRoutes from './routes/product.js';
import categoryRoutes from './routes/category';
import userRoutes from './routes/user';
import authRoutes from './routes/auth'
import cors from 'cors';
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
//connection 
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
  console.log('database connected')
});
mongoose.connection.on('Error',err => {
    console.log(`data connect failed , ${err.message}`)
})
app.use(cors())
app.use(expressValidator());
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use('/api', authRoutes);
app.use('/api',userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {console.log(port)})