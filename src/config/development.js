module.exports = {
  db: {
    connectionSring: 'mongodb://localhost:27017/test',
  },
  jwt: {
    key: 'jwt-secret',
    transactionKey: 'transaction-secret',
    expires: '30d',
    leadExpires: '5m',
    issuer: 'dev-app',
  },
};
