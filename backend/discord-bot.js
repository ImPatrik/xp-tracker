const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Create Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ]
});

client.once('ready', () => {
  console.log(`✅ Discord bot logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
  console.error('❌ Failed to login to Discord:', err.message);
});

/**
 * Determine ticket status based on reactions
 * @param {Message} message - Discord message object
 * @returns {String} - Status: 'approved', 'rejected', or 'pending'
 */
function getTicketStatus(message) {
  const reactions = message.reactions.cache;

  // Check for approval reactions (👍 or ✅)
  const hasApproval = reactions.some(reaction =>
    reaction.emoji.name === '👍' || reaction.emoji.name === '✅'
  );

  // Check for rejection reactions (👎 or ❌)
  const hasRejection = reactions.some(reaction =>
    reaction.emoji.name === '👎' || reaction.emoji.name === '❌'
  );

  if (hasApproval) return 'approved';
  if (hasRejection) return 'rejected';
  return 'pending';
}

/**
 * Post a new ticket to Discord channel
 * @param {Object} ticketData - The ticket information
 * @returns {Promise<Object>} - Discord message object with ID
 */
async function postTicketToDiscord(ticketData) {
  const { title, description, priority, submittedBy } = ticketData;

  // Get the channel
  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);

  // Determine color based on priority
  const priorityColors = {
    low: 0x00ff00,      // Green
    medium: 0xffa500,   // Orange
    high: 0xff0000      // Red
  };

  // Create embed
  const embed = new EmbedBuilder()
    .setTitle(`🎫 ${title}`)
    .setDescription(description)
    .addFields(
      { name: 'Priority', value: priority.toUpperCase(), inline: true },
      { name: 'Submitted By', value: submittedBy, inline: true }
    )
    .setColor(priorityColors[priority] || 0x0099ff)
    .setTimestamp();

  const message = await channel.send({ embeds: [embed] });

  return {
    messageId: message.id,
    channelId: channel.id,
    timestamp: message.createdTimestamp
  };
}

/**
 * Fetch all tickets from Discord channel
 * @param {Number} limit - Maximum number of tickets to fetch (default: all)
 * @returns {Promise<Array>} - Array of ticket objects
 */
async function fetchTicketsFromDiscord(limit = null) {
  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
  const tickets = [];
  let lastMessageId;

  while (true) {
    // Determine how many messages to fetch in this batch
    const batchSize = limit ? Math.min(100, limit - tickets.length) : 100;

    if (batchSize === 0) break;

    // Fetch messages
    const options = { limit: batchSize };
    if (lastMessageId) {
      options.before = lastMessageId;
    }

    const messages = await channel.messages.fetch(options);

    if (messages.size === 0) break;

    // Parse each message into a ticket object
    messages.forEach(message => {
      if (message.embeds.length > 0) {
        const embed = message.embeds[0];

        // Extract ticket data from embed
        const ticket = {
          id: message.id,
          title: embed.title?.replace('🎫 ', '') || 'Untitled',
          description: embed.description || '',
          priority: embed.fields.find(f => f.name === 'Priority')?.value.toLowerCase() || 'medium',
          submittedBy: embed.fields.find(f => f.name === 'Submitted By')?.value || 'Unknown',
          timestamp: message.createdTimestamp,
          createdAt: new Date(message.createdTimestamp).toISOString(),
          status: getTicketStatus(message)
        };

        tickets.push(ticket);
      }
    });

    // If we have a limit and reached it, stop
    if (limit && tickets.length >= limit) break;

    // If no more messages, stop
    if (messages.size < 100) break;

    lastMessageId = messages.last().id;

    // Small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return tickets;
}

/**
 * Fetch a single ticket by message ID
 * @param {String} messageId - Discord message ID
 * @returns {Promise<Object>} - Ticket object
 */
async function fetchTicketById(messageId) {
  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
  const message = await channel.messages.fetch(messageId);

  if (message.embeds.length === 0) {
    throw new Error('Message does not contain a ticket embed');
  }

  const embed = message.embeds[0];

  return {
    id: message.id,
    title: embed.title?.replace('🎫 ', '') || 'Untitled',
    description: embed.description || '',
    priority: embed.fields.find(f => f.name === 'Priority')?.value.toLowerCase() || 'medium',
    submittedBy: embed.fields.find(f => f.name === 'Submitted By')?.value || 'Unknown',
    timestamp: message.createdTimestamp,
    createdAt: new Date(message.createdTimestamp).toISOString(),
    status: getTicketStatus(message)
  };
}

module.exports = {
  client,
  postTicketToDiscord,
  fetchTicketsFromDiscord,
  fetchTicketById
};
