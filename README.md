# derby-cache
Derby server side module to cache app pages requests.

This module is very basic at the moment.
Suggestions and improvements are welcome.
It may cause drastic memory usage increase since there is no cache limit at the
moment.

There are some improvements I'd like to do.
See `Whishlist` chapter at the bottom.


## Prerequisites

At the time of writing, in order for this module to work, Derby need to be
patched so that when a page is rendered the output is emitted.

You may use my `derby`
[patched repo](https://github.com/mattbrun/derby/tree/renderEmit),
or wait for this patch to be accepted in mainstream `derby` - `derby` issue
[#504](https://github.com/derbyjs/derby/pull/504).


## Installation

```bash
$ npm install --save derby-cache
```


## Usage

In the index.js of your derby app require the `derby-cache` module with
`app.use`:
```js
var app = module.exports = derby.createApp('app', __filename);
// ...
app.use(require('derby-cache'));
// ...

```


## Whishlist

- Render the cached pages with `setInterval`
- Render the cached pages when the subscribed/fetched inputs of that
page change, but not too often using a minimun timeout between each render
  - Both the above cases will need to extract the solely page rendering logic
  from the actual derby `Page.prototype.render` in
  [`Page.server.js`](https://github.com/derbyjs/derby/blob/master/lib/Page.server.js#L5),
  which actually handles both the page rendering and the client response of the
  rendered page.
- Cache only the top hitted pages, with and option which determines the
thresholds
- Consider the possibility to cache by complete url: url + query
  - This qould allow us to cache specific rendered pages, if frequently visited,
  such as those pages which manges queries filters through url query parameters


## License

The MIT License (MIT)

Copyright (c) 2015 Matteo Brunati

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
