// services/mikrotikClient.js
const MikroNode = require('@f5eng/mikronode');
require('dotenv').config();

/**
 * Connects to a MikroTik router using credentials.
 * @param {string} host - Router IP or hostname.
 * @param {string} user - API username.
 * @param {string} pass - API password.
 * @returns {Promise} Connection object.
 */
async function connectToRouter(
  host = process.env.MIKROTIK_HOST,
  user = process.env.MIKROTIK_USER,
  pass = process.env.MIKROTIK_PASS
) {
  try {
    console.log(`🔌 Connecting to router ${host} ...`);

    // Create the connection
    const connection = MikroNode.getConnection(host, user, pass, {
      timeout: 5000, // optional, 5 seconds
    });

    // Open the connection
    await connection.open();

    console.log(`✅ Connected to router ${host}`);
    return connection;

  } catch (error) {
    console.error('❌ Router connection failed:', error.message);
    throw new Error('Failed to connect to MikroTik router');
  }
}

module.exports = { connectToRouter };
