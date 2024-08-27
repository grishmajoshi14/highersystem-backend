const express = require('express');
const pool = require('./config/postgres');
const router = express.Router();

// Create a new service request
router.post('/', async (req, res) => {
    const { service_name, full_name, email, phone_no, query } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ServiceRequests (service_name, full_name, email, phone_no, query) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [service_name, full_name, email, phone_no, query]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating service request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all service requests
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ServiceRequests');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting service requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific service request by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM ServiceRequests WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error getting service request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a specific service request
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { service_name, full_name, email, phone_no, query, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ServiceRequests SET service_name = $1, full_name = $2, email = $3, phone_no = $4, query = $5, status = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [service_name, full_name, email, phone_no, query, status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating service request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a specific service request
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM ServiceRequests WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.status(200).json({ message: 'Service request deleted successfully' });
    } catch (error) {
        console.error('Error deleting service request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
