import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.js';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
// app.use(morgan('dev'));
app.use('/api',productRoutes);
app.use(bodyParser.json());
const port = process.env.PORT || 8000

app.listen(port, () => {console.log(port)})