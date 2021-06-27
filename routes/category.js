import express from 'express';
import { create, List, categoryById, read, Update, Remove, photo } from '../controllers/category';
import { userById } from '../controllers/user'
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
const router = express.Router();
router.post('/category/:userId', requireSignin, isAdmin, isAuth, create);
// router.post('/category', create);
router.get('/categories', List);
router.get('/category/:categoryId', read);
// router.put('/category/:categoryId', Update);
router.get("/category/photo/:categoryId", photo);
router.put('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, Update);
// router.delete('/category/:categoryId', Remove);

router.delete('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, Remove);
router.param('categoryId', categoryById);
router.param("userId", userById);
module.exports = router;