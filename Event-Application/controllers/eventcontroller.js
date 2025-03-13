const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create an event
router.post('/', async (req, res) => {
    try {
        const { name, description, date, time, category } = req.body;
        const newEvent = new Event({ name, description, date, time, category });

        await newEvent.save();
        res.status(201).json({ message: 'Event created and awaiting approval', event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event', details: error.message });
    }
});

// View events (Fixing the issue in DB query)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1, category: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events', details: error.message });
    }
});

// Export the router instead of an object
module.exports = router;
