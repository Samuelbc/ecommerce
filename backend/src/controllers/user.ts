import { Request, Response } from 'express';
import pool from '../config/database';

const getUser = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  try {
    const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export { getUser };
