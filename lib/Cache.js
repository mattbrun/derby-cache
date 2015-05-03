// ############################################################################
// Cacher class
// ############################################################################

function Cache (app, options) {
  console.log('### Cache');
  
  var _onRoute = app.onRoute;
  
  app.cache = {};

  app.on('pageRendered', function (page, renderedPage) {
    app.cache[page.params.url] = renderedPage;
  });

  app.onRoute = function (callback, page, next, done) {
    var cacheIdx      = page.params.url,
        renderedPage  = app.cache[cacheIdx];
    
    if (renderedPage) {
      console.log('### cache hit');
      page.res.send(app.cache[page.params.url]);
    } else {
      console.log('### cache miss');
      _onRoute.apply(app, arguments);
    }
  };
}



// ############################################################################
// Exports
// ############################################################################

module.exports = Cache;