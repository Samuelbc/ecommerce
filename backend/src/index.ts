import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { productRouter } from './routes/product';
import { orderRouter } from './routes/order';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
