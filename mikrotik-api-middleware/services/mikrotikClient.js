const MikroNode = require('@f5eng/mikronode');
require('dotenv').config();

async function connect() {
  const connection = new MikroNode(process.env.MIKROTIK_HOST);
  await connection.connect(process.env.MIKROTIK_USER, process.env.MIKROTIK_PASS);
  return connection;
}

module.exports = connect;
