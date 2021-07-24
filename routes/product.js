import express from "express";
import {
  update,
  create,
  listProduct,
  productById,
  read,
  remove,
  listBySearch,
  photo,
  listCategories,
  listRelated,
  getByKey,
  countListCategories,
  totalProductByCategory,
} from "../controllers/product";
import { userById } from "../controllers/user";
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
const router = express.Router();

router.get("/products/categories", listCategories);
router.get("/products", listProduct);
router.get("/products/key", getByKey);
// router.post("/products/search", listBySearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/countbycategory", countListCategories);
router.get("/products/totalByCategory", totalProductByCategory);
router.get("/products/:productId", read);
router.post("/products/:userId", requireSignin, isAdmin, isAuth, create);
// router.post('/products', create);
// router.delete('/products/:productId', remove)
router.delete(
  "/products/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);
// router.put('/products/:productId', update);
router.put(
  "/products/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  update
);
router.get("/product/photo/:productId", photo);
router.param("productId", productById);
router.param("userId", userById);
module.exports = router;
