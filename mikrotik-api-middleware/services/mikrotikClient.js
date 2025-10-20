const { connect } = require('@f5eng/mikronode');
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
  pass = process.env.MIKROTIK_PASSWORD
) {
  try {
    console.log(`🔌 Connecting to router ${host} ...`);
    const connection = await connect(host, user, pass);
    console.log(`✅ Connected to router ${host}`);
    return connection;
  } catch (error) {
    console.error('❌ Router connection failed:', error.message);
    throw new Error('Failed to connect to MikroTik router');
  }
}

module.exports = { connectToRouter };
