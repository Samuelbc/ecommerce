import { Request, Response } from 'express';
import pool from '../config/database';
import Order from '../models/order';

const createOrder = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { productIds, total } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, product_ids, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, productIds, total, 'Pending']
    );
    const order: Order = result.rows[0];
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const getOrders = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  try {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    const orders: Order[] = result.rows;
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    const order: Order = result.rows[0];
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    const order: Order = result.rows[0];
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
