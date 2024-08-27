const express = require('express');
const pool = require('../config/postgres');
const router = express.Router();

// Create a new signup entry
router.post('/', async (req, res) => {
    const { g_id, firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO signup (g_id, firstName, lastName, email, phoneNumber, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [g_id, firstName, lastName, email, phoneNumber, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all signup entries
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM signup');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting signups:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific signup entry by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM signup WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Signup not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error getting signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a specific signup entry
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { g_id, firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE signup SET g_id = $1, firstName = $2, lastName = $3, email = $4, phoneNumber = $5, password = $6 WHERE id = $7 RETURNING *',
            [g_id, firstName, lastName, email, phoneNumber, password, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Signup not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a specific signup entry
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM signup WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Signup not found' });
        }
        res.status(200).json({ message: 'Signup deleted successfully' });
    } catch (error) {
        console.error('Error deleting signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
