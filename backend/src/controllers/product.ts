import { Request, Response } from 'express';
import pool from '../config/database';
import Product from '../models/product';

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    const products: Product[] = result.rows;
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const product: Product = result.rows[0];
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, stock]
    );
    const product: Product = result.rows[0];
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
      [name, description, price, stock, id]
    );
    const product: Product = result.rows[0];
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
