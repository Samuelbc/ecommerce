import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product';
import auth from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export { router as productRouter };
