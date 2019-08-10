const close = require('./pgMock.js').close;

module.exports = async () => {
  close();
};
