const pool = require('../db');

module.exports = {
  createUser: async (email, password, country, otp) => {
    try {
      const result = await pool.query(
        'INSERT INTO users (email, password, country, otp_code, otp_verified) VALUES ($1, $2, $3, $4, false) RETURNING *',
        [email, password, country, otp]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  verifyOTP: async (email, otp) => {
    try {
      const result = await pool.query(
        'UPDATE users SET otp_verified = true WHERE email = $1 AND otp_code = $2 RETURNING *',
        [email, otp]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      if (error.code === '23505') {
        // handle duplicate OTP error
        throw new Error('Invalid OTP');
      }
      throw error;
    }
  }
};