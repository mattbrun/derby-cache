var Cache = require('./lib/Cache');

module.exports = function(app, options){
  new Cache(app, options);
};
