import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/order';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

export { router as orderRouter };
