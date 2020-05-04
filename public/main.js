const cluster = require('cluster');

if (cluster.isMaster) {
  require('./electron.js');
  cluster.fork();
} else {
  console.log("start server")
  require('../server/server.js');
}