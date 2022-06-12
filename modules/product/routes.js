import express from 'express';
const router = express.Router();
import { createNewProduct, getCategoryProducts, getProductDetail, deleteProduct, updateProductDetail, getAllProducts } from "./productController.js";

router.get('/', (getAllProducts))
router.get('/category-products', (getCategoryProducts));

router.post('/create-product', (createNewProduct));
router.get('/product/:productId', (getProductDetail))

router.delete('/product/:productId', (deleteProduct))

router.patch('/product/:productId', (updateProductDetail))

export default router