// #############################################################################
// Dependencies
// #############################################################################

var _       = require('lodash');



// #############################################################################
// Config
// #############################################################################

var defaultOptions = {
  maxPagesToCache: 10
};



// #############################################################################
// Cacher class
// #############################################################################

function Cache (app, options) {
  var opts = options
  _.merge(opts, defaultOptions);


  app.cache = {
    count: 0
  };


  // This event is emitted by in Page.server.js by Page.prototype.render
  app.on('pageRendered', function (page, renderedPage) {
    var cache = app.cache;

    if ((opts.maxPagesToCache > 0) && (opts.maxPagesToCache <= app.cache.count)) {
      // If the cache reached its limit, a cache item will be removed
      var maxTs = -1,
          maxId = null;
      for (var id in cache) {
        if (maxTs < cache[id].ts) {
          maxTs = cache[id].ts;
          maxId = id;
        }
      }
      delete cache[maxId];
      cache.count--;
    }

    cache[page.params.url] = {
      ts: Date.now(),
      page: renderedPage
    };
    cache.count++;
  });


  var _onRoute = app.onRoute;
  app.onRoute = function (callback, page, next, done) {
    var cacheId       = page.params.url,
        renderedPage  = (app.cache[cacheId] ? app.cache[cacheId].page : false);

    if (renderedPage) {
      page.res.send(app.cache[cacheId].page);
    } else {
      // This will call Page.prototype.render in Page.server.js so that the
      // `pageRendered` event is emitted, and we cache the render result
      _onRoute.apply(app, arguments);
    }
  };
}



// #############################################################################
// Exports
// #############################################################################

module.exports = Cache;
