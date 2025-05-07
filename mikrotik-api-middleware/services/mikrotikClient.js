const MikroNode = require('mikronode-ng');

function connect() {
  return new MikroNode(process.env.MIKROTIK_HOST)
    .connect(process.env.MIKROTIK_USER, process.env.MIKROTIK_PASS);
}

module.exports = connect;
