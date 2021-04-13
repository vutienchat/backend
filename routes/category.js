import express from 'express';
import {create , List , categoryById,read,Update,Remove} from '../controllers/category';
const router = express.Router();
router.post('/category',create);
router.get('/categories',List);
router.get('/category/:categoryId',read);
router.put('/category/:categoryId',Update);
router.delete('/category/:categoryId',Remove);
router.param('categoryId',categoryById);
module.exports = router;