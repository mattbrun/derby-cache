var Cache = require('./lib/Cache');

module.exports = function(app, options){
  return new Cache(app, options);
};
