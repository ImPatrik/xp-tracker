const express = require('express');
const router = express.Router();
const { postTicketToDiscord, fetchTicketsFromDiscord, fetchTicketById } = require('../discord-bot');

/**
 * POST /create-ticket
 * Creates a new ticket and posts it to Discord
 */
router.post('/create-ticket', async (req, res, next) => {
  try {
    const { title, description, priority, submittedBy } = req.body;

    // Validate required fields
    if (!title || !description || !priority || !submittedBy) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, description, priority, submittedBy'
      });
    }

    // Validate priority
    if (!['low', 'medium', 'high'].includes(priority.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Priority must be low, medium, or high'
      });
    }

    // Post ticket to Discord
    const discordMessage = await postTicketToDiscord({
      title,
      description,
      priority: priority.toLowerCase(),
      submittedBy
    });

    res.json({
      success: true,
      ticket: {
        id: discordMessage.messageId,
        title,
        description,
        priority: priority.toLowerCase(),
        submittedBy,
        timestamp: discordMessage.timestamp,
        createdAt: new Date(discordMessage.timestamp).toISOString()
      }
    });

  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create ticket',
      message: error.message
    });
  }
});

/**
 * GET /tickets
 * Fetches all tickets from Discord
 * Query params:
 *   - limit: number of tickets to fetch (optional)
 */
router.get('/tickets', async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    const tickets = await fetchTicketsFromDiscord(limit);

    res.json({
      success: true,
      count: tickets.length,
      tickets
    });

  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tickets',
      message: error.message
    });
  }
});

/**
 * GET /tickets/:id
 * Fetches a single ticket by Discord message ID
 */
router.get('/tickets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await fetchTicketById(id);

    res.json({
      success: true,
      ticket
    });

  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(404).json({
      success: false,
      error: 'Ticket not found',
      message: error.message
    });
  }
});

module.exports = router;
