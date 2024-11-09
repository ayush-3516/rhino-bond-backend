import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.post('/', addProduct);

export default router;
