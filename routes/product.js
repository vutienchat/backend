import express from 'express';
import {update ,create,listProduct, productById, read , remove, photo,listCategories,listRelated} from '../controllers/product';
const router = express.Router();
router.get("/products/categories", listCategories);
router.get('/products',listProduct);
router.get("/products/related/:productId", listRelated);
router.get('/products/:productId',read);
router.post('/products',create);
router.delete('/products/:productId',remove);
router.put('/products/:productId',update);
router.get("/product/photo/:productId", photo)
router.param("productId",productById);
module.exports = router;