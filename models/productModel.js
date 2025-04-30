const pool = require('../db');

module.exports = {
  createProduct: async (name, description, price, userId) => {
    try {
      const result = await pool.query(
        'INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllProducts: async () => {
    try {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateProduct: async (id, name, description, price) => {
    try {
      const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
        [name, description, price, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    try {
      await pool.query('DELETE FROM products WHERE id = $1', [id]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};