const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,  // Disable SQL logging for cleaner output
  dialectOptions: {
    // Uncomment the below if you're using 'mysql_native_password'
    // authPlugins: { sha256_password: mysql_native_password }
  },
  pool: {
    max: 5,       // Maximum number of connections
    min: 0,       // Minimum number of connections
    acquire: 30000,  // Maximum time to get connection (ms)
    idle: 10000     // Maximum idle time (ms)
  }
});

module.exports = sequelize;
