const url = require('url');

module.exports = function parseUrl(req){
    const parsed = url.parse(req.url, true);
    const parts = parsed.pathname.split('/').filter(Boolean);
     return{
        pathname:parsed.pathname,
        resource:parts[0] || null,
        id:parts[1]|| null
     }
}