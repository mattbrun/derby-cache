var Cacher = require('./lib/Cacher');

module.exports = function(app, options){
  new Cacher(app, options);
};
